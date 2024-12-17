var btnsearch = document.getElementById("btnsearch");
var rowOfwearher = document.getElementById("rowOfwearher");

btnsearch?.addEventListener("input", function (e) {
  var country = e.target.value;
  if (country.length >= 3) getData(country);
});

(function location() {
  var location = navigator.geolocation;
  location?.getCurrentPosition(function (position) {
    var lat = position.coords.latitude;
    var lang = position.coords.longitude;
    getData(`${lat},${lang}`);
  }, showerror);
})();
function showerror(error) {
  if (error.code === error.PERMISSION_DENIED) {
    getData("cairo");
  } else {
    window.alert("error on location")
  }
}
async function getData(country) {
  
    var data = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?q=${country}&days=3&key=acfffc4824ff42268af163312241412`
    );
    var dataOfCountry = await data.json();
    display(dataOfCountry, dataOfCountry.forecast.forecastday);
 
}

function display(dataOfCountry, arr) {
  if (!rowOfwearher) return;
  var date = new Date(dataOfCountry.current.last_updated);

  rowOfwearher.innerHTML = `<div class="rounded-start-3 rounded-end-0 card day1">
                <div class="card-header d-flex justify-content-between">
                  <p id="day">${date.toLocaleString("en-us", {
                    weekday: "long",
                  })}</p>
                  <p id="date">${date.toLocaleString("en-us", {
                    day: "numeric",
                  })}${date.toLocaleString("en-us", { month: "long" })}</p>
                </div>
                <div class="card-body">
                  <h5 class="fw-light lh-lg" id="city">${
                    dataOfCountry.location.name
                  }</h5>
                  <h1 class="tempofcard" id="temp">${
                    dataOfCountry.current.temp_c
                  }<sup>o</sup>C</h1>
                  <img src="https:${
                    dataOfCountry.current.condition.icon
                  }" class="icon ms-3 py-4 " width="90" alt="weather"/>
                  <p class="weather ">${
                    dataOfCountry.current.condition.text
                  }</p>
                </div>
                <div class="d-flex gap-3 ps-3 mb-4">
                  <div><img src="image/icon-umberella.png" class="pe-2"/>20%</div>
                  <div><img src="image/icon-wind.png" class="pe-2"/>18km/h</div>
                  <div><img src="image/icon-compass@2x.png" width="30" class="pe-2"/>East</div>
                </div>
            </div>
         `;
  for (let i = 1; i < arr.length; i++) {
    if (!rowOfwearher) return;
    var day = new Date(arr[i].date);

    rowOfwearher.innerHTML += `
            <div class=" card  rounded-0 text-center ">
              <div id="card-header" class="text-center card-header">
                <p>${day.toLocaleString("en-us", { weekday: "long" })}</p>
              </div>
              <div class="card-body text-center d-flex flex-column justify-content-center align-items-center gap-3 ">
                  <img src="https:${
                    arr[i].day.condition.icon
                  }" class="icon" width="40"> 
                  <h1>${arr[i].day.maxtemp_c}<sup>o</sup>C</h1>
                  <p>${arr[i].day.mintemp_c}<sup>o</sup></p>
                  <p class="weather ">${arr[i].day.condition.text}</p>
            </div>
            </div>
            `;
    i % 2 != 0
      ? document.querySelectorAll(".card")[i].classList.add("day2")
      : document.querySelectorAll(".card")[i].classList.add("day1");
  }
}
