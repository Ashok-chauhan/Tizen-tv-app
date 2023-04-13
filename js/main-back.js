(function () {
  "use strict";

  //var player;

  // flag to monitor UHD toggling
  //var uhdStatus = false;

  /**
   * Register keys used in this application
   */
  function registerKeys() {
    var usedKeys = [
      "MediaPlay",
      "MediaPause",
      "MediaStop",
      "MediaFastForward",
      "MediaRewind",
      "0",
      "1",
      "2",
      "3",
    ];

    usedKeys.forEach(function (keyName) {
      tizen.tvinputdevice.registerKey(keyName);
    });
  }

  /**
   * Handle input from remote
   */
  function registerKeyHandler() {
    document.addEventListener("keydown", function (e) {
      switch (e.keyCode) {
        case 13: // Enter
          console.log("### Enter / Ok pressed!");
          //webapis.avplay.play();
          if (webapis.avplay.getState() === "IDLE") {
            webapis.avplay.prepare();
            webapis.avplay.play();
          } else if (webapis.avplay.getState() === "PAUSED") {
            webapis.avplay.play();
          }
          break;
        case 415: // MediaPlay
          //webapis.avplay.play();
          if (webapis.avplay.getState() === "IDLE") {
            webapis.avplay.prepare();
            webapis.avplay.play();
          } else if (webapis.avplay.getState() === "PAUSED") {
            webapis.avplay.play();
          }
          break;
        case 19: // MediaPause
          webapis.avplay.pause();
          break;
        case 37:
          console.log("# Left arrow pressed!");
          break;
        case 38:
          console.log("# Up arrow pressed!");
          break;
        case 39:
          console.log("# Right arrow pressed!");
          break;
        case 40:
          console.log("# Down arrow pressed!");

          break;
        case 413: // MediaStop
          webapis.avplay.stop();
          break;
        case 417: // MediaFastForward
          //webapis.avplay.ff();
          webapis.avplay.jumpForward("3000", successCallback, errorCallback);
          break;
        case 412: // MediaRewind
          webapis.avplay.jumpBackward("3000", successCallback, errorCallback);
          break;

        case 50: //Key 2
          webapis.avplay.getTracks();
          break;
        case 51: //Key 3
          webapis.avplay.getProperties();
          break;
        case 10009: // Return
          if (
            webapis.avplay.getState() !== "IDLE" &&
            webapis.avplay.getState() !== "NONE"
          ) {
            webapis.avplay.stop();
          }
          tizen.application.getCurrentApplication().hide();
          window.history.back();
          //window.location.replace("file:///index.html");

          break;
        case 10252:
          console.log(" ## Media play / pause! ");
          break;
        default:
          log("Unhandled key");
      }
    });
  }

  /**
   * Function initialising application.
   */
  window.onload = function () {
    if (window.tizen === undefined) {
      log("This application needs to be run on Tizen device");
      return;
    }

    registerKeys();
    registerKeyHandler();
    //registerMouseEvents();

    // successCallback();
    // errorCallback();

    //player: document.getElementById('av-player'),
    //controls: document.querySelector('.video-controls'),
  };
})();
