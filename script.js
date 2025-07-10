async function getWeather() {
    const cityInput = document.getElementById("cityInput");
    const city = cityInput.value.trim();
    const apiKey = "076333ad5cc9b3659e3cafbf9fbedbd3";
    const weatherDiv = document.getElementById("weather");

    if (!city) {
        weatherDiv.innerHTML = '<p style="color:red;">Please enter your City</p>';
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    weatherDiv.innerHTML = '<p style="color:blue;">Loading...</p>';

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("City not found");

        const data = await response.json();

        const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        const localTime = new Date(data.dt * 1000).toLocaleString();

        const weatherInfo = `
            <div>
                <h2>Weather in ${data.name}, ${data.sys.country}</h2>
                <p>
                    <img src="${iconUrl}" alt="Weather Icon" />
                    <strong>${data.weather[0].main}</strong> (${data.weather[0].description})
                </p>
                <p><strong>Temperature: </strong>${data.main.temp}°C</p>
                <p><strong>Feels Like: </strong>${data.main.feels_like}°C</p>
                <p><strong>Humidity: </strong>${data.main.humidity}%</p>
                <p><strong>Wind Speed: </strong>${data.wind.speed} m/s</p>
                <p><strong>Time: </strong>${localTime}</p>
            </div>
        `;

        weatherDiv.innerHTML = weatherInfo;
        cityInput.value = "";

    } catch (error) {
        weatherDiv.innerHTML = `<p style="color:red;">ERROR: ${error.message}</p>`;
    }
}
// Dark/Light Mode Toggle
document.getElementById("modeToggle").addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
  });
