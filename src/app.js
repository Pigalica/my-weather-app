function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let time = `${hours}:${minutes}`;

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[date.getDay()];

  return `${day} ${time}`;
}

function displayWeatherConditions(response) {
  celsiusTemperature = response.data.temperature.current;
  let wind = Math.round(response.data.wind.speed);
  let city = response.data.city;
  let weatherDescription = response.data.condition.description;
  let humidity = Math.round(response.data.temperature.humidity);
  let country = response.data.country;
  let temperatureElement = document.querySelector("#displayedTemperature");
  let windElement = document.querySelector("#wind");
  let humidityElement = document.querySelector("#humidity");
  let weatherDescriptionElement = document.querySelector(
    "#weather-description"
  );
  let displayedCityAndCountry = document.querySelector(
    "#displayedCityAndCountry"
  );
  let iconElement = document.querySelector("#icon");
  let dateElement = document.querySelector("#date-and-time");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  windElement.innerHTML = wind;
  displayedCityAndCountry.innerHTML = `${city}, ${country}`;
  humidityElement.innerHTML = humidity;
  weatherDescriptionElement.innerHTML = weatherDescription;
  iconElement.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
  iconElement.setAttribute("alt", response.data.condition.description);
  dateElement.innerHTML = formatDate(response.data.time * 1000);
  console.log(response.data);
}

function search(city) {
  let apiKey = "f48290bo64bt17bab9a1b6c6eb3dae46";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
  axios.get(apiUrl).then(displayWeatherConditions);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#searchedCity");
  search(cityInputElement.value);
}

function findCurrentPositionWeather(position) {
  let currentLongitude = position.coords.longitude;
  let currentLatitude = position.coords.latitude;
  let apiKey = "f48290bo64bt17bab9a1b6c6eb3dae46";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${currentLongitude}&lat=${currentLatitude}&key=${apiKey}`;
  axios.get(apiUrl).then(displayWeatherConditions);
}

function recieveCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(findCurrentPositionWeather);
}

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#displayedTemperature");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheiTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheiTemperature);
}

function convertToCelsius(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#displayedTemperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#current-location");
currentLocationButton.addEventListener("click", recieveCurrentPosition);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);

search("Kiev");
