export function renderWeather(data) {
    const container = document.getElementById('weather-result');
    if (data.cod !== 200) {
        container.innerHTML = `<p class="error">City not found.</p>`;
        return;
    }

    container.innerHTML = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <p> ${data.main.temp} °C</p>
        <p> Humidity: ${data.main.humidity}%</p>
        <p> Wind: ${data.wind.speed} m/s</p>
    `;
}