function getWeatherEmoji(condition) {
    const map = {
        Clear: "☀️",
        Clouds: "☁️",
        Rain: "🌧️",
        Drizzle: "🌦️",
        Thunderstorm: "⛈️",
        Snow: "❄️",
        Mist: "🌫️",
        Smoke: "💨",
        Haze: "🌫️",
        Dust: "🌪️",
        Fog: "🌫️",
        Sand: "🌪️",
        Ash: "🌋",
        Squall: "🌬️",
        Tornado: "🌪️",
    };
    return map[condition] || "❔";
}


export function renderWeather(data, unit = "metric") {
    const container = document.getElementById('weather-result');
    if (data.cod !== 200) {
        container.innerHTML = `<p class="error">City not found.</p>`;
        return;
    }

    const tempUnit = unit === "metric" ? "°C" : "°F";
    const windUnit = unit === "metric" ? "m/s" : "mph";
    const emoji = getWeatherEmoji(data.weather[0].main);

    container.innerHTML = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <p>${emoji} ${data.weather[0].description}
        <p> ${data.main.temp} ${tempUnit}</p>
        <p> Humidity: ${data.main.humidity}%</p>
        <p> Wind: ${data.wind.speed} ${windUnit}</p>
    `;
}

// weather/dom.js
export function renderForecast(data) {
    const forecastContainer = document.getElementById('forecast');
    forecastContainer.innerHTML = "<h3>5-Day Forecast</h3>";

    if (!data || !data.list) {
        forecastContainer.innerHTML += `<p class="error">No forecast data available.</p>`;
        return;
    }

    const dailyData = {};
    data.list.forEach(entry => {
        const date = entry.dt_txt.split(" ")[0];
        const hour = entry.dt_txt.split(" ")[1];

        // Prefer midday (12:00:00) data for each day
        if (hour === "12:00:00") {
            dailyData[date] = entry;
        }
    });

    Object.keys(dailyData).slice(0, 5).forEach(date => {
        const entry = dailyData[date];
        const temp = Math.round(entry.main.temp);
        const desc = entry.weather[0].description;
        const icon = entry.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;

        const item = document.createElement("div");
        item.className = "forecast-day";
        item.innerHTML = `
            <p><strong>${new Date(date).toLocaleDateString(undefined, { weekday: "short" })}</strong></p>
            <img src="${iconUrl}" alt="${desc}" />
            <p>${temp}°C</p>
            <p>${desc}</p>
        `;
        forecastContainer.appendChild(item);
    });
}
