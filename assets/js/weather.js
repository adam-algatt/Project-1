// //var URL = "https://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&appid=a22e1d322f701f954bc18b4b1b6801cc"


var forecastArr = [];

// //array containing latitude and longitude for cities covered by app
// //lat and long vals are currently filler info **MAKE SURE TO CHANGE** before MVP
// var coordinates = [{
//     name: 'Portland',
//     latitude: 15,
//     longitude: 15
//   },
//   {
//     name: 'Eugene',
//     latitude: 44.37,
//     longitude: -123.58
//   },
//   {
//     name: 'Bend', //     ,K Falls 
//     latitude: 44.05,
//     longitude: -121.31
//   },
//   {
//     name: Newport,
//     latitude: 44.63,
//     longitude: -124.05
//   },
//   {
//     name: Astoria,
//     latitude: 46.18,
//     longitude: -123.83
//   },
//   {
//     name: Salem,
//     latitude: 44.94,
//     longitude: -123.04
//   },
//   {
//     name: Medford,
//     latitude: 42.32,
//     longitude: -122.87
//   },
//   {
//     name:  LaGrande,
//     latitude: 45.32,
//     longitude: -118.08
//   },
//   {
//   name:  Pendelton,
//   latitude: 45.67,
//   longitude: -118.78
// },
// {
// name:  Klamath-Falls,
// latitude: 42.22,
// longitude: -121.78
// }
// ];

//once city selection is added to the dropdown menu the url below will be added in between the fetch function '()' 
//var url = "https://weatherbit-v1-mashape.p.rapidapi.com/forecast/3hourly?lat=" + latitude + "&lon=" + Longitude + "&units=I&days=5";

//variables used in injectHtml()
var weatherEl = document.getElementsByClassName('weather');


//function takes key val pairs from forcastObj and injects info into HTML #weather . 
function injectHtml(arr) {
  for (i=0; i<arr.length; i++){
let temp = arr[i].temp;
let relativeHumidity = arr[i].relativeHumidity + '%';
let description = arr[i].desc;
weatherEl.setAttribute('class', 'weather  center-align col s12');
let weatherDiv = document.createElement('div');
weatherEl.appendChild(weatherDiv);
let weatherUl = document.createElement('ul');
document.createElement('li');
li.textContent = description;
document.createElement('li');
li.textContent = temp;
document.createElement('li');
li.textContent = relativeHumidity;
weatherUl.appendChild('li'); 
weatherDiv.appendChild(weatherUl);

  }
}; 


function forecast(data) {
  console.log(data);
  // console.log(data.data[0].temp);
  // console.log(data.data[0].temp);
for (i=0; i < data.data.length; i++){
let forecastObj = {};
  let temp = data.data[i].temp;
  let relativeHumidity = data.data[i].temp + '%';
  let description = data.data[i].weather.description;
  Object.assign(forecastObj, {
    'desc': description,
    'temp': temp,
   'relative-humidity': relativeHumidity
  });
  forecastArr.push(forecastObj);
  forecastObj = {}; 
}
   //console.log(forecastObj);
   //injectHtml(forecastArr);
  console.log(forecastArr);
  return forecastArr;
};

// //API fetch gets weather data and calls forecast function to format data 
// //Eventually this will be a concatinated string that selects a latitude/longitude based on city selection by user


fetch("https://weatherbit-v1-mashape.p.rapidapi.com/forecast/daily?lat=35.5&lon=-78.5&units=I&days=10", {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "weatherbit-v1-mashape.p.rapidapi.com",
		"x-rapidapi-key": "ee1b44b791msh8215eb3c769e560p1621afjsnd130e673bf11"
	}
})
.then(response => response.json())
   .then(data => forecast(data));