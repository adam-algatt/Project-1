// //var URL = "https://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&appid=a22e1d322f701f954bc18b4b1b6801cc"



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

  console.log('temperature:', data.data[0].temp);
  console.log('description:', data.data[0].weather.description);
  // console.log(data.data[0].temp);
  // console.log(data.data[0].temp);

  let temp = data.data[0].temp;

  let relativeHumidity = data.data[0].temp + '%';
  let description = data.data[0].weather.description;
  Object.assign(forecastObj, {
    'description': description,
    'temperature': temp,
   'relative-humidity': relativeHumidity
  });
   console.log(forecastObj);
   //injectHtml(forecastObj);
  return forecastObj;

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