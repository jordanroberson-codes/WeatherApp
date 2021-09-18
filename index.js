//-----Show Date-----------------------------------------------------//
let now = new Date();

let h2 = document.querySelector("h2");
let date = now.getDate();
let hours = now.getHours();
let minutes = now.getMinutes();
let year = now.getFullYear();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let month = months[now.getMonth()];
h2.innerHTML = `${day}, ${month} ${date}, ${year}`;

//-----Search Engine--------------------------------------------------//

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#searchTextInput");
  let h2 = document.querySelector("#currentLocation");
  getWeatherSearch(searchInput.value);
  h2.innerHTML = `${searchInput.value}`;
}

function getWeatherSearch(city) {
  let apiKey = "e450bc345a80a08ada69fd5c714d871d";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(url).then(showWeatherSearch);
}

function showWeatherSearch(response) {
  let searchTemp = document.querySelector("#tempElement");
  let searchWind = document.querySelector("#wind");
  let searchHumidity = document.querySelector("#humidity");
  let searchDescription = document.querySelector("#description");
  let temperature = Math.round(response.data.main.temp);
  let windSpeed = Math.round(response.data.wind.speed);
  searchDescription.innerHTML = response.data.weather[0].description;
  searchTemp.innerHTML = `${temperature}&deg;F`;
  searchHumidity.innerHTML = response.data.main.humidity;
  searchWind.innerHTML = `${windSpeed}`;
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

//---Temperature Change-----------------------------------------------------//
// function convertToFahrenheit(event) {
//   event.preventDefault();
//   let temperatureElement = document.querySelector("#tempElement");
//   temperatureElement.innerHTML = 86;
// }

// let fahrenheitLink = document.querySelector("#fahrenheit-link");
// fahrenheitLink.addEventListener("click", convertToFahrenheit);

// function convertToCelsius(event) {
//   event.preventDefault();
//   let temperatureElement = document.querySelector("#tempElement");
//   temperatureElement.innerHTML = 30;
// }

// let celsiusLink = document.querySelector("#celsius-link");
// celsiusLink.addEventListener("click", convertToCelsius);

//-----Current Location---------------------------------------------//
function showWeather(response) {
  document.querySelector("#currentLocation").innerHTML = response.data.name;
  document.querySelector("#tempElement").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
}

function retrievePosition(position) {
  let apiKey = "e450bc345a80a08ada69fd5c714d871d";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;
  axios.get(url).then(showWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(retrievePosition);
}
let currentLocationButton = document.querySelector("#currentLocationButton");
currentLocationButton.addEventListener("click", getCurrentLocation);
