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
          console.log(err);
        });
    });
  }

  const elem = document.querySelector("#cats");

  async function Data() {
    const categoryid = await categoryId();
    const weather_url = categoryid[categoryid.length - 1].weather_url_whiz;
    const weatherData = await weather(weather_url);
    const weatherElement = document.getElementById("weather");
    weatherElement.innerHTML = `<div>${weatherData.location} </div><div> ${weatherData.temperatuer} \u00B0
    <span> <img src="${weatherData.icon}"/></span>`;

    var elem = document.getElementById("content");

    elem.scrollTop = elem.scrollHeight;

    var tbl = document.createElement("table");
    tbl.style.width = "100%";
    tbl.setAttribute("border", "0");
    var tbdy = document.createElement("tbody");

    //console.log(categoryid[categoryid.length - 1].weather_url_whiz);
    categoryid.forEach((cid) => {
      if (cid.id !== undefined) {
        var tr = document.createElement("tr");

        let trCatname = document.createElement("tr");
        let tdCatname = document.createElement("td");
        tdCatname.colSpan = 3;
        tdCatname.className = "h2";
        tdCatname.innerHTML = ` ${cid.name} `;
        trCatname.appendChild(tdCatname);
        tbdy.appendChild(trCatname);
        getData("https://prodman.whizti.com/api/category/" + cid.id)
          .then(function (data) {
            for (let i = 0; i <= data.response.content.length; i++) {
              if (data.response.content[i].icon_uri) {
                //console.log(data.response.content[i].title);
                var td = document.createElement("td");

                td.className = "item";
                td.innerHTML += `<a href="video.html?videoUrl=${data.response.content[i].uri}"><div>
		        	<img src="${data.response.content[i].icon_uri}" width="500" height="200" />
              <span class="title"> ${data.response.content[i].title}</span>
		        	</div><a>`;
              } else {
                td.innerHTML += `<div class="item" > ${data.response.content[i].title}</div>`;
              }
              tr.appendChild(td);
            }
          })
          .catch((error) => {
            //console.log(error);
          });

        tbdy.appendChild(tr);
      }
    });
    tbl.appendChild(tbdy);
    elem.appendChild(tbl);
  }

  Data();
};
