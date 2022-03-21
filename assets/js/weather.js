var forecastArr = [];


// //Object for accessing lat & lon based on city selection. Will access based on city selection value in dropdown
var cityCoordinates = {
  Ashland: "?lat=42.2&lon=-122.7",
  Astoria: "?lat=46.2&lon=-123.8",
  Beaverton: "?lat=45.5&lon=-122.8",
  Bend: "?lat=44.1&lon=-121.3",
  Brookings: "?lat=42.1&lon=-124.3",
  Burns: "?lat=43.6&lon=-119.1",
  CannonBeach: "?lat=45.9&lon=-124.0",
  CoosBay: "?lat=43.4&lon=-124.2",
  Corvallis: "?lat=44.6&lon=-123.3",
  Eugene: "?lat=44.1&lon=-123.1",
  Florence: "?lat=44.0&lon=-124.1",
  ForestGrove: "?lat=45.5&lon=-123.1",
  GrantsPass: "?lat=42.4&lon=-123.3",
  Gresham: "?lat=45.5&lon=-122.4",
  Hillsboro: "?lat=45.5&lon=-123.0",
  HoodRiver: "?lat=45.7&lon=-121.5",
  JohnDay: "?lat=44.4&lon=-119.0",
  KlamathFalls: "?lat=42.2&lon=-121.8",
  LincolnCity: "?lat=45.0&lon=-124.0",
  Medford: "?lat=42.3&lon=-122.9",
  McMinnville: "?lat=45.2&lon=-123.2",
  Newberg: "?lat=45.3&lon=-123.0",
  Newport: "?lat=44.6&lon=-124.1",
  Pendleton: "?lat=45.7&lon=-118.8",
  Portland: "?lat=45.5&lon=-122.7",
  Roseburg: "?lat=43.2&lon=-123.3",
  Salem: "?lat=44.9&lon=-123.0",
  Seaside: "?lat=46.0&lon=-123.9",
  Sisters: "?lat=44.3&lon=-121.5",
  TheDalles: "?lat=45.6&lon=-121.2",
  Tigard: "?lat=45.4&lon=-122.8",
  Tillamook: "?lat=45.5&lon=-123.8",
  Tualatin: "?lat=45.4&lon=-122.8"
};

// //function takes key val pairs from forcastObj and injects info into HTML #weather . 
function injectHtml(arr) {
  for (i = 0; i < 5; i++) {
    let idQuery = "forecast-" + i;
    let forecastDay = document.getElementById(idQuery);
    let temp = arr[i].temp;
    let relativeHumidity = arr[i].humidity;
    let description = arr[i].desc;
    let wind = arr[i].wind;
    // console.log(arr[i].weather);
    let degreeSymbol = String.fromCharCode(176) + 'F';
    let forecastDescription = document.getElementById("forecast-title-" + i);
    let forecastTemp = document.getElementById("temp-" + i);
    let forecastRelativeHumidity = document.getElementById("humidity-" + i);
    let forecastWind = document.getElementById("wind-" + i);
    let weatherIcon = "https://www.weatherbit.io/static/img/icons/" + arr[i].icon + ".png";

    forecastDescription.innerText = description;
    forecastTemp.innerText = temp + degreeSymbol;
    forecastRelativeHumidity.innerText = relativeHumidity;
    forecastWind.innerText = wind;
    let forecastImg = $("#weather-img-" + i);
    forecastImg.attr("src", weatherIcon);
    $("#hidden").attr("id", "forecast-div");
  }
};

function forecast(data) {
  for (i = 0; i < data.data.length; i++) {
    let forecastObj = {};
    let temp = data.data[i].temp;
    let humidity = data.data[i].rh + '%';
    let description = data.data[i].weather.description;
    let wind = data.data[i].wind_cdir + ' ' + data.data[i].wind_spd + "mph";
    let icon = data.data[i].weather.icon;
    Object.assign(forecastObj, {
      'desc': description,
      'temp': temp,
      'humidity': humidity,
      'wind': wind,
      'icon': icon
    });
    forecastArr.push(forecastObj);
    forecastObj = {};
  }
  injectHtml(forecastArr);
  return forecastArr;
};


$('#submit').on("click", function () {
  const city = $("#city").val();
  //removes space in city so cityCoord obj can be queried 
  let parsed = city.split(" ").join('');

  //jqery api call
  const settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://weatherbit-v1-mashape.p.rapidapi.com/forecast/daily" + cityCoordinates[parsed] + "&units=imperial",
    "method": "GET",
    "headers": {
      "x-rapidapi-host": "weatherbit-v1-mashape.p.rapidapi.com",
      "x-rapidapi-key": "7e9e619138msh8dc4909ebddbce5p1e15ebjsnb45a522d5f6e"
    }
  };

  $.ajax(settings).done(function (response) {
    forecast(response);
  });
});





// .then(response => response.json())