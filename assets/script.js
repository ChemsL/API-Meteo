let container = document.getElementById("container");
let apiCall = function (city) {
  fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=ce3b2cb1d7d366bd8433ccc993efca64&units=metric&lang=fr`
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      document.getElementById("city").innerHTML =
        `<i class="bi bi-geo-alt"></i>` + data.city.name;
      
      let forecastContainer = document.getElementById("forecast-container");
      forecastContainer.innerHTML = ""; // Efface les anciennes prévisions

      // Itérer sur les prévisions toutes les 3 heures pour les prochains 5 jours
      for (let i = 0; i < 40; i++) { // 8 prévisions par jour (5 jours)
        const forecast = data.list[i];
        const forecastTime = new Date(forecast.dt * 1000); // Convertir le timestamp en date
        const date = forecastTime.toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
        const time = forecastTime.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });

        const temperature = forecast.main.temp;
        const humidity = forecast.main.humidity;
        const windSpeed =  (forecast.wind.speed * 3.6).toFixed(2);;
        const weatherDescription = forecast.weather[0].description;

        const forecastDiv = document.createElement("div");
        forecastDiv.className = "forecast-item";
        forecastDiv.innerHTML = `
         <div id="forecastDiv"> <div class="forecast-date"><h5><i class="bi bi-calendar-date"></i> ${date}</h5></div>
          <div class="forecast-time"><i class="bi bi-clock"></i> ${time}</div>
          <div class="forecast-temperature"><i class="bi bi-thermometer-half"></i>${temperature}°C</div>
          <div class="forecast-humidity"><i class="bi bi-droplet"></i>${humidity}%</div>
          <div class="forecast-wind"><i class="bi bi-wind"></i>${windSpeed}Km/h</div>
          <div class="forecast-description">${weatherDescription}</div>
          </div>
        `;

        forecastContainer.appendChild(forecastDiv);
      }
    });
};

document.querySelector('form button').addEventListener('click', function() {
  let ville = document.querySelector('#ville').value;
  apiCall(ville);
});

apiCall('Paris');