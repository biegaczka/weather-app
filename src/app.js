function formatedDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = days[dayIndex];
  return `Today is ${day}, ${hours}:${minutes}`;
}

function showTemperature(response) {
  let cityElement= document.querySelector("#city");
  cityElement.innerHTML=response.data.name;
  console.log(cityElement);
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#temperature-element");
  let description = response.data.weather[0].description;
  let descriptionElement = document.querySelector("#weather-description");
  temperatureElement.innerHTML = `${temperature}°C`;
  descriptionElement.innerHTML = `${description}`;
}

function searchCity(city){
  let apiKey = "06ca6b2e6fb5a01a965d59c5f70dc4cc";
  let apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

function searchLocation (position) {
  let apiKey = "06ca6b2e6fb5a01a965d59c5f70dc4cc";
  let units="metric";
  let apiUrl =`http://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}

function localWeather (event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let small = document.querySelector("#date");
let date = new Date();
small.innerHTML = formatedDate(date);

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit",handleSubmit);

let currentLocalization=document.querySelector("#my-localization");
currentLocalization.addEventListener("click", localWeather);
searchCity("Gdynia");


