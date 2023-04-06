(function () {
  "use strict";

  /**
   * Displays logging information on the screen and in the console.
   * @param {string} msg - Message to log.
   */
  function log(msg) {
    var logsEl = document.getElementById("logs");

    if (msg) {
      // Update logs
      console.log("[PlayerAvplay]: " + msg);
      logsEl.innerHTML += msg + "<br />";
    } else {
      // Clear logs
      logsEl.innerHTML = "";
    }

    logsEl.scrollTop = logsEl.scrollHeight;
  }

  var player;

  // flag to monitor UHD toggling
  var uhdStatus = false;

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
          webapis.avplay.toggleFullscreen();
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
        case 48: //Key 0
          log();
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
