function displayWeatherConditions(response) {
  let temperature = Math.round(response.data.temperature.current);
  let wind = Math.round(response.data.wind.speed);
  let city = response.data.city;
  let humidity = Math.round(response.data.temperature.humidity);
  let country = response.data.country;
  let temperatureElement = document.querySelector("#displayedTemperature");
  let windElement = document.querySelector("#wind");
  let humidityElement = document.querySelector("#humidity");
  let displayedCityAndCountry = document.querySelector(
    "#displayedCityAndCountry"
  );
  temperatureElement.innerHTML = temperature;
  windElement.innerHTML = wind;
  displayedCityAndCountry.innerHTML = `${city}, ${country}`;
  humidityElement.innerHTML = humidity;
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

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#current-location");
currentLocationButton.addEventListener("click", recieveCurrentPosition);

search("Kiev");
