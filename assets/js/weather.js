
var cityFormEl = document.querySelector("#city-form");
var cityInputEl = document.querySelector("#city");


var forecastArr = [];

//Object for accessing lat & lon based on city selection. Will access based on city selection value in dropdown
var coordinates = {
  "Ashland": "?lat=42.1&lon=-122.4",
  "Astoria": "?lat=46.1&lon=-123.5",
  "Beaverton": "?lat=45.3&lon=-122.5",
  "Bend": "?lat=44.2&lon=-121.2",
  "Brookings": "?lat=42.3&lon=-124.2",
  "Burns": "?lat=43.5&lon=-119.3",
  "Cannon Beach": "?lat=45.5&lon=-123.6",
  "Coos Bay": "?lat=43.2&lon=-124.1",
  "Corvallis": "?lat=44.3&lon=-123.2",
  "Eugene": "?lat=44.4&lon=-123.6",
  "Florence": "?lat=43.6&lon=-124.6",
  "Forest Grove": "?lat=45.3&lon=-123.6",
  "Grants Pass": "?lat=42.3&lon=-123.2",
  "Grehsam": "?lat=45.3&lon=-122.3",
  "Hillsobro": "?lat=45.3&lon=-122.6",
  "Hood River": "?lat=45.4&lon=-121.3",
  "John Day": "?lat=44.3&lon=-118.6",
  "Klamath Falls": "?lat=42.1&lon=-121.5",
  "Lincoln City": "?lat=44.6&lon=-124.1",
  "Medford": "?lat=42.2&lon=-122.5",
  "McMinnville": "?lat=45.1&lon=-123.1",
  "Newberg": "?lat=45.2&lon=-122.6",
  "Newport": "?lat=44.4&lon=-124.3",
  "Pendleton": "?lat=45.4&lon=-118.5",
  "Portland": "?lat=45.3&lon=-122.4",
  "Roseburg": "?lat=43.1&lon=-123.2",
  "Salem": "?lat=44.6&lon=-123.1",
  "Seaside": "?lat=45.6&lon=-123.6",
  "Sisters": "?lat=44.2&lon=-121.3",
  "The Dalles": "?lat=45.4&lon=-121.6",
  "Tigard": "?lat=45.3&lon=-122.5",
  "Tillamook": "?lat=45.3&lon=-123.5",
  "Tualatin": "?lat=45.2&lon=-122.5"
};


//once city selection is added to the dropdown menu the url below will be added in between the fetch function '()' 
//var url = "https://weatherbit-v1-mashape.p.rapidapi.com/forecast/3hourly?lat=" + latitude + "&lon=" + Longitude + "&units=I&days=5";


//variables used in injectHtml()



//function takes key val pairs from forcastObj and injects info into HTML #weather . 
function injectHtml(arr) {
  for (i = 0; i < 5; i++) {
    let idQuery = "forecast-" + i;
    console.log(idQuery);
    let forecastDay = document.getElementById(idQuery);
    console.log(forecastDay);
    let temp = arr[i].temp;
    let relativeHumidity = arr[i].humidity;
    let description = arr[i].desc;
    let wind = arr[i].wind;
  let degreeSymbol = String.fromCharCode(176) + 'F';
    let forecastDescription = document.getElementById("forecast-title-" + i);
    let forecastTemp = document.getElementById("temp-" + i);
    let forecastRelativeHumidity = document.getElementById("humidity-" + i);
    let forecastWind = document.getElementById("wind-" + i);
  console.log(forecastDescription, forecastTemp, forecastRelativeHumidity);
    
  forecastDescription.innerText = description;
  forecastTemp.innerText = temp + degreeSymbol;
  forecastRelativeHumidity.innerText = relativeHumidity;
  forecastWind.innerText = wind;

  }
};

function forecast(data) {
  console.log(data);

  // console.log(data.data[0].temp);
  // console.log(data.data[0].temp);
  for (i = 0; i < data.data.length; i++) {
    let forecastObj = {};
    let temp = data.data[i].temp;
    let humidity = data.data[i].rh + '%';
    let description = data.data[i].weather.description;
    let wind = data.data[i].wind_cdir + ' ' + data.data[i].wind_spd + "mph";
    Object.assign(forecastObj, {
      'desc': description,
      'temp': temp,
      'humidity': humidity,
      'wind': wind
    });
    forecastArr.push(forecastObj);
    forecastObj = {};
  }

  console.log(forecastArr);

  injectHtml(forecastArr);
  return forecastArr;

};


 
  var getWeather = function(city) {

  // get value from input element
  let citySelect = cityInputEl.value.trim();
  citySelect = toString(citySelect);
  let coord = coordinates.citySelect; 
  console.log(coord);
  console.log(citySelect);
  debugger;
  var url = "https://weatherbit-v1-mashape.p.rapidapi.com/forecast/daily" + coord + "&units=imperial&lang=en";


  fetch(url, {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "weatherbit-v1-mashape.p.rapidapi.com",
		"x-rapidapi-key": "7e9e619138msh8dc4909ebddbce5p1e15ebjsnb45a522d5f6e"
	}
})
.then(response => {
	console.log(response);
})
.catch(err => {
	console.error(err);
});

};

 cityFormEl.addEventListener("submit", getWeather(this.city));

