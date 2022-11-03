function displayDayOfWeekAndTime(date) {
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

function formatDay(timestap) {
  let date = new Date(timestap * 1000);
  let day = date.getDay();

  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#weather-forecast");

  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="col-2">
      <div class="weather-forecast-date">${formatDay(forecastDay.time)}</div>
      <img
        src='${forecastDay.condition.icon_url}'
        alt=""
        width="56"
      />
      <div class="weather-forecast-temperature">
        <span class="weather-forecast-temperature-max">${Math.round(
          forecastDay.temperature.maximum
        )}°</span>
        <span class="weather-forecast-temperature-min">${Math.round(
          forecastDay.temperature.minimum
        )}°</span>
      </div>
    </div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;

  forecastElement.innerHTML = forecastHTML;
}

function getForecast(city) {
  let units = "metric";
  let apiKey = "f48290bo64bt17bab9a1b6c6eb3dae46";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayForecast);
}

function displayWeatherConditions(response) {
  let celsiusTemperature = response.data.temperature.current;
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
  let currentTime = new Date();

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
  dateElement.innerHTML = displayDayOfWeekAndTime(currentTime);

  getForecast(city);
}

function verifyIfSearchIsValid(response) {
  if (response.data.city) {
    displayWeatherConditions(response);
  } else {
    alert("Sorry, can't find your city. Please, enter valid city name");
  }
}

function search(city) {
  let units = "metric";
  let apiKey = "f48290bo64bt17bab9a1b6c6eb3dae46";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(verifyIfSearchIsValid);
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
  axios.get(apiUrl).then(verifyIfSearchIsValid);
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
