requestAnimationFrame('dotenv').config();

const apiKey = process.env.API_KEY;

const GEO_API = "http://api.openweathermap.org/geo/1.0/direct";
const API_URL = "https://api.openweathermap.org/data/3.0/onecall";

const locationInput = document.getElementById('locationInput');
const searchButton = document.getElementById('searchButton');
const locationElement = document.getElementById('location');
const temperatureElement = document.getElementById('temperature');
const descriptionElement = document.getElementById('description');

locationInput.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById('searchButton').click();
  }
});

searchButton.addEventListener('click', () => {
  const location = locationInput.value;
  if (location) {
    getWeather(location);
  }
});

function getWeather(location) {

  const GEO_URL = `${GEO_API}?q=${location}&limit=${1}&appid=${apiKey}`

  fetch(GEO_URL)
    .then(response => response.json())
    .then(data => {
      const lat = data[0].lat
      const lon = data[0].lon
      
      const API_CALL = `${API_URL}?lat=${lat}&lon=${lon}&appid=${apiKey}&exclude=minutely,hourly&units=imperial&lang=en`

      fetch(API_CALL)
        .then(response => response.json())
        .then(weather => {
          
          locationElement.textContent = weather.name;
          temperatureElement.textContent = `${Math.round(weather.current.temp)}°F`;
          descriptionElement.textContent = weather.daily[0].summary;

        })
        .catch(error => {
          console.error(error);
        });
      
    })
    .catch(error => {
      console.error(error);
    });
}