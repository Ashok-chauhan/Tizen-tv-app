(function () {
  console.log("Executing main / loaded");
  /**
   * Handle input from remote
   */
  function registerKeyHandler() {
    document.addEventListener("keydown", function (e) {
      switch (e.keyCode) {
        case 38: //UP arrow
          console.log("#### >> Up Arrow");

          break;
        case 40: //DOWN arrow
          console.log("####>> Down arrow");

          break;
        case 13: //OK button
          var keyName = keys.key.id + keys.key.innerHTML,
            index;
          if ((index = keys.registeredKeys.indexOf(keyName)) !== -1) {
            console.log("OK - unregister key: " + keyName);
            keys.registeredKeys.splice(index, 1);
            tizen.tvinputdevice.unregisterKey(keyName);
          } else {
            console.log("OK - register key: " + keyName);
            keys.registeredKeys.push(keyName);
            tizen.tvinputdevice.registerKey(keyName);
          }
          break;
        case 10009: //RETURN button
          tizen.application.getCurrentApplication().hide();
          break;
        default:
          console.log("Key code : " + e.keyCode);
          break;
      }
    });
  }

  /**
   *
   */
  var keys = {
    parent: null,
    key: null,
    registeredKeys: [],
    focus: function () {
      this.key.classList.add("focused");
    },
    blur: function () {
      this.key.classList.remove("focused");
    },
  };

  /**
   * Start the application once loading is finished
   */
  window.onload = function () {
    if (window.tizen === undefined) {
      console.log("This application needs to be run on Tizen device");
      return;
    }

    registerKeyHandler();

    console.log("kye registering");

    keys.parent = document.getElementById("pagelist");
    keys.key = keys.parent.firstElementChild;

    keys.focus();
  };
})();
