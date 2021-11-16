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
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wendsday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednsday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return days[day];
}

function displayForecast(response) {
  forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
                <div class="col-2">
                  <div class="weather-forecast-date">${formatDay(
                    forecastDay.dt
                  )}</div>
                  <img
                    src="http://openweathermap.org/img/wn/${
                      forecastDay.weather[0].icon
                    }@2x.png"
                    alt="" width="36"
                  />
                  <div class="weather-forecast-temperatures">
                    <span class="weather-forecast-temperature-max"> ${Math.round(
                      forecastDay.temp.max
                    )}° </span>
                    <span class="weather-forecast-temperature-min"> ${Math.round(
                      forecastDay.temp.min
                    )}° </span>
                  </div>
                </div>
           `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;

  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "fc6aaa11eb87ef192ffff5b3c7cdceb9";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  celsiusTemperature = response.data.main.temp;
  temperatureElement.innerHTML = Math.round(celsiusTemperature);

  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.name;

  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.weather[0].description;

  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.main.humidity;

  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round(response.data.wind.speed);

  let dateElement = document.querySelector("#date");
  dateElement.innerHTML = formatDate(response.data.dt * 1000);

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

function search(city) {
  let apiKey = "fc6aaa11eb87ef192ffff5b3c7cdceb9";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

function showFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let tempMaxElements = document.querySelectorAll(
    ".weather-forecast-temperature-max"
  );
  let tempMinElements = document.querySelectorAll(
    ".weather-forecast-temperature-min"
  );
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);

  let day0MaxF = (forecast[0].temp.max * 9) / 5 + 32;
  let day0MinF = (forecast[0].temp.min * 9) / 5 + 32;
  let day1MaxF = (forecast[1].temp.max * 9) / 5 + 32;
  let day1MinF = (forecast[1].temp.min * 9) / 5 + 32;
  let day2MaxF = (forecast[2].temp.max * 9) / 5 + 32;
  let day2MinF = (forecast[2].temp.min * 9) / 5 + 32;
  let day3MaxF = (forecast[3].temp.max * 9) / 5 + 32;
  let day3MinF = (forecast[3].temp.min * 9) / 5 + 32;
  let day4MaxF = (forecast[4].temp.max * 9) / 5 + 32;
  let day4MinF = (forecast[4].temp.min * 9) / 5 + 32;
  let day5MaxF = (forecast[5].temp.max * 9) / 5 + 32;
  let day5MinF = (forecast[5].temp.min * 9) / 5 + 32;

  tempMaxElements[0].innerHTML = `${Math.round(day0MaxF)}°`;
  tempMinElements[0].innerHTML = `${Math.round(day0MinF)}°`;
  tempMaxElements[1].innerHTML = `${Math.round(day1MaxF)}°`;
  tempMinElements[1].innerHTML = `${Math.round(day1MinF)}°`;
  tempMaxElements[2].innerHTML = `${Math.round(day2MaxF)}°`;
  tempMinElements[2].innerHTML = `${Math.round(day2MinF)}°`;
  tempMaxElements[3].innerHTML = `${Math.round(day3MaxF)}°`;
  tempMinElements[3].innerHTML = `${Math.round(day3MinF)}°`;
  tempMaxElements[4].innerHTML = `${Math.round(day4MaxF)}°`;
  tempMinElements[4].innerHTML = `${Math.round(day4MinF)}°`;
  tempMaxElements[5].innerHTML = `${Math.round(day5MaxF)}°`;
  tempMinElements[5].innerHTML = `${Math.round(day5MinF)}°`;
}

function showCelsiusTemperature(event) {
  event.preventDefault();

  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  let tempMaxElements = document.querySelectorAll(
    ".weather-forecast-temperature-max"
  );
  let tempMinElements = document.querySelectorAll(
    ".weather-forecast-temperature-min"
  );
  temperatureElement.innerHTML = Math.round(celsiusTemperature);

  let day0MaxF = forecast[0].temp.max;
  let day0MinF = forecast[0].temp.min;
  let day1MaxF = forecast[1].temp.max;
  let day1MinF = forecast[1].temp.min;
  let day2MaxF = forecast[2].temp.max;
  let day2MinF = forecast[2].temp.min;
  let day3MaxF = forecast[3].temp.max;
  let day3MinF = forecast[3].temp.min;
  let day4MaxF = forecast[4].temp.max;
  let day4MinF = forecast[4].temp.min;
  let day5MaxF = forecast[5].temp.max;
  let day5MinF = forecast[5].temp.min;

  tempMaxElements[0].innerHTML = `${Math.round(day0MaxF)}°`;
  tempMinElements[0].innerHTML = `${Math.round(day0MinF)}°`;
  tempMaxElements[1].innerHTML = `${Math.round(day1MaxF)}°`;
  tempMinElements[1].innerHTML = `${Math.round(day1MinF)}°`;
  tempMaxElements[2].innerHTML = `${Math.round(day2MaxF)}°`;
  tempMinElements[2].innerHTML = `${Math.round(day2MinF)}°`;
  tempMaxElements[3].innerHTML = `${Math.round(day3MaxF)}°`;
  tempMinElements[3].innerHTML = `${Math.round(day3MinF)}°`;
  tempMaxElements[4].innerHTML = `${Math.round(day4MaxF)}°`;
  tempMinElements[4].innerHTML = `${Math.round(day4MinF)}°`;
  tempMaxElements[5].innerHTML = `${Math.round(day5MaxF)}°`;
  tempMinElements[5].innerHTML = `${Math.round(day5MinF)}°`;
}

let celsiusTemperature = null;
let forecast = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsiusTemperature);

search("New York");
