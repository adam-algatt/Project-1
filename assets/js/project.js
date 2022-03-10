
//var URL = "https://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&appid=a22e1d322f701f954bc18b4b1b6801cc"


var forecastObj = {}; 

//array containing latitude and longitude for cities covered by app
//lat and long vals are currently filler info **MAKE SURE TO CHANGE** before MVP
var coordinates = [
  {name: 'Portland',
latitude: 15,
longitude: 15
}, 
{name: 'Eugene',
latitude: 25,
longitude: 10
}
];

function forecast(data) {
let temp = data.current.temp; 
let feelsLike = data.current.feels_like;
let humidity = data.current.humidity; 
 let description = data.current.weather[0].description; 
Object.assign(forecastObj, {description: description, temperature: temp, feels_like: feelsLike, humidity: humidity});
console.log(forecastObj);
return forecastObj; 
};

//API fetch gets weather data and calls forecast function to format data 
//Eventually this will be a concatinated string that selects a latitude/longitude based on city selection by user
fetch('https://api.openweathermap.org/data/2.5/onecall?lat=45.35&lon=-122.35&units=imperial&exclude=hourly,minutely,daily&appid=a22e1d322f701f954bc18b4b1b6801cc')
  .then(response => response.json())
  .then(data => forecast(data) 
  ); 

