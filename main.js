// API Call
const API_KEY = "7db4c811b1da67a13f44062f8780a91d"
const GEO_API = "http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}"

const button = document.querySelector('button');
document.createElement('button'); 
button.addEventListener('click', getCityName);


function getCityName() {
    if ("geolocation" in navigator) {
        

        navigator.geolocation.getCurrentPosition(
            (position => {
                const lat = position.coords.latitude;
                const long = position.coords.longitude;

                const API_CALL = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${long}&appid=${API_KEY}&exclude=minutely,hourly&units=imperial&lang=en`

                fetch(API_CALL).then(function(response) {
                    return response.json();
                  }).then(function(data) {
                    for (const day of data.daily) {
                      const date = new Date(day.dt * 1000);
                      const year = date.getFullYear();
                      const month = date.getMonth();
                      const day_month = date.getDate();

                      let body = document.querySelector('body');
                      let p = document.createElement('p');
                      let p1 = document.createElement('h2');
                      let p2 = document.createElement('h1');
                      p2.textContent = `${month}/${day_month}/${year}`;
                      p1.textContent = `${day.weather[0].description}`;
                      p.textContent = `${day.summary}`;
                      body.appendChild(p2);
                      body.appendChild(p1);
                      body.appendChild(p);
                    }

                  }).catch(function(err) {
                    console.log('Fetch Error :-S', err);
                  });
            })

            
        )
    }
}


// Weather App

// App window

// Find Location

// Get Weather for location

