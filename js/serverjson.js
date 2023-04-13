/**
 * Handle input from remote
 */
var catid;
function registerKeyHandler() {
  document.addEventListener("keydown", function (e) {
    switch (e.keyCode) {
      case 37: //LEFT arrow
        console.log("#### >> LEFT Arrow");
        keys.blur();

        let leftkeyName = keys.key.id;
        console.log(">>>>" + leftkeyName);

        let leftKey = document.getElementById(leftkeyName);
        let lcount = leftKey.children;
        let lcounter = 0;
        for (let i = 0; i < lcount.length; i++) {
          if (leftKey.children[i].className === "item focused") {
            lcounter = i;
            break;
          }
        }
        for (let i = 0; i < lcount.length; i++) {
          if (i === lcounter) {
            leftKey.children[i].classList.remove("focused");
            lcounter--;
            leftKey.children[lcounter].classList.add("focused");
            break;
          }
        }

        break;

      case 38: //UP arrow
        console.log("#### >> Up Arrow");
        //clearing focused item
        if (catid !== undefined) {
          let did = document.getElementById(catid);
          let ct = did.children;

          for (let i = 0; i < ct.length; i++) {
            if (did.children[i].className === "item focused") {
              did.children[i].classList.remove("focused");
              break;
            }
          }
        }

        keys.blur();
        if (keys.key === keys.parent.firstElementChild) {
          keys.key = keys.parent.lastElementChild;
        } else {
          keys.key = keys.key.previousElementSibling;
        }
        console.log("key >>-Up " + JSON.stringify(keys));
        keys.focus();
        break;

      case 39: //RIGHT arrow
        console.log("#### >> RIGHT Arrow");
        keys.blur();

        let arrowkeyName = keys.key.id;
        console.log(">>>>" + arrowkeyName);
        catid = arrowkeyName;
        let arrowKey = document.getElementById(arrowkeyName);
        let count = arrowKey.children;
        let counter = 0;
        for (let i = 0; i < count.length; i++) {
          if (arrowKey.children[i].className === "item focused") {
            counter = i;
            break;
          }
        }
        for (let i = 0; i < count.length; i++) {
          if (i === counter) {
            arrowKey.children[i].classList.remove("focused");
            counter++;
            arrowKey.children[counter].classList.add("focused");
            break;
          }
        }

        break;

      case 40: //DOWN arrow
        console.log("####>> Down arrow");
        //Clearing focused item

        if (catid !== undefined) {
          let did = document.getElementById(catid);
          let ct = did.children;

          for (let i = 0; i < ct.length; i++) {
            if (did.children[i].className === "item focused") {
              did.children[i].classList.remove("focused");
              break;
            }
          }
        }

        keys.blur();
        if (keys.key === keys.parent.lastElementChild) {
          keys.key = keys.parent.firstElementChild;
        } else {
          keys.key = keys.key.nextElementSibling;
        }
        console.log("key >>: " + JSON.stringify(keys));
        keys.focus();
        break;
      case 13: //OK button
        console.log("ok button");
        let video_url;
        if (catid !== undefined) {
          let did = document.getElementById(catid);
          let ct = did.children;

          for (let i = 0; i < ct.length; i++) {
            if (did.children[i].className === "item focused") {
              video_url = did.children[i].id;
              break;
            }
          }
        }
        window.location.href = "file:///video.html?videoUrl=" + video_url;

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

var arrkeys = {
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

window.onload = (event) => {
  console.log("page is fully loaded");

  async function getData(url = "") {
    // Default options are marked with *

    var response = await fetch(url, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      // body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }

  // getting weather
  function weather(url) {
    return new Promise(function (resolve, reject) {
      getData(url)
        .then((data) => {
          let response = {
            location: data.rss.channel.item.location,
            temperatuer: data.rss.channel.item.temperature,
            conditiontext: data.rss.channel.item.conditiontext,
            icon: data.rss.channel.item.conditioniconlarge,
          };
          resolve(response);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }

  function categoryId() {
    return new Promise((resolve, reject) => {
      var catId = [];
      getData("https://prodman.whizti.com/api/publication/116")
        .then((data) => {
          let weather = {
            weather_url_whiz:
              data.response.config.weather_url +
              "?zip_code=" +
              data.response.config.zipcode,
          };

          for (let i = 0; i < data.response.categories.length; i++) {
            if (
              data.response.categories[i].uri !== undefined &&
              data.response.categories[i].uri !== ""
            ) {
              //filter parent categories
              const cats = {
                id: data.response.categories[i].id,
                name: data.response.categories[i].label,
              };
              catId.push(cats);
            }
          }
          catId.push(weather);
          resolve(catId);
        })
        .catch((err) => {
          //console.log(err);
        });
    });
  }

  //const elem = document.querySelector("#cats");

  async function Data() {
    const categoryid = await categoryId();
    const weather_url = categoryid[categoryid.length - 1].weather_url_whiz;
    const weatherData = await weather(weather_url);
    const weatherElement = document.getElementById("weather");
    weatherElement.innerHTML = `<div>${weatherData.location} </div><div> ${weatherData.temperatuer} \u00B0
    <span> <img src="${weatherData.icon}"/></span>`;
    var elemContent = document.getElementById("pagelist");

    //elem.scrollTop = elem.scrollHeight;

    categoryid.forEach((cid) => {
      if (cid.id !== undefined) {
        // fdiv.className = "flex_container";
        let div = document.createElement("div");
        div.className = "flex_container";
        div.setAttribute("id", cid.id);

        getData("https://prodman.whizti.com/api/category/" + cid.id)
          .then(function (data) {
            for (let i = 0; i <= data.response.content.length; i++) {
              if (data.response.content[i].icon_uri) {
                div.innerHTML += `
                <div class="item" id="${data.response.content[i].uri}" >
                <a href="video.html?videoUrl=${data.response.content[i].uri}">
                
                  <img src="${data.response.content[i].icon_uri}" width="500" height="200" />
                  <span class="title"> ${data.response.content[i].title}</span>
                
                <a>
                </div>`;
              } else {
                div.innerHTML += `<div class="item" > ${data.response.content[i].title}</div>`;
              }
            }
          })
          .catch((error) => {
            //console.log(error);
          });
        elemContent.appendChild(div);
      }
    });
  }

  Data();

  registerKeyHandler();

  keys.parent = document.getElementById("pagelist");

  keys.key = keys.parent.firstElementChild;

  if (keys.key !== undefined) {
    keys.focus();
  } else {
    keys.key = keys.parent;
    keys.focus();
  }
};
