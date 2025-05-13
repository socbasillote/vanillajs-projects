import { getWeather, getForecast } from "./weather/api.js";
import { renderWeather, renderForecast } from "./weather/dom.js";


const btn = document.getElementById('get-weather');
const input = document.getElementById('city-input');

const historyKey = "weatherSearchHistory";
const historyList = document.getElementById("history-list");

let currentUnit = "metric";

const celsiusBtn = document.getElementById("celsius-btn");
const fahrenheitBtn = document.getElementById("fahrenheit-btn");

celsiusBtn.addEventListener("click", () => {
  currentUnit = "metric";
  celsiusBtn.classList.add("active");
  fahrenheitBtn.classList.remove("active");
});

fahrenheitBtn.addEventListener("click", () => {
  currentUnit = "imperial";
  fahrenheitBtn.classList.add("active");
  celsiusBtn.classList.remove("active");
});

function saveToHistory(city) {
    let history = JSON.parse(localStorage.getItem(historyKey)) || [];
    history = history.filter(item => item !== city); // Remove duplicates
    history.unshift(city); // add to top
    if (history.length > 5) history.pop(); // Limit to 5 entries
    localStorage.setItem(historyKey, JSON.stringify(history));
    renderHistory();
}

function renderHistory() {
    let history = JSON.parse(localStorage.getItem(historyKey)) || [];
    historyList.innerHTML = "";
    history.forEach(city => {
        const li = document.createElement("li");
        li.textContent = city;
        li.className = "history-item";
        li.addEventListener("click", () => {
            getWeather(city);
        });
        historyList.appendChild(li);
    });
}

btn.addEventListener('click', async () => {
    const city = input.value.trim();
    if (city) {
        const data = await getWeather(city, currentUnit);
        const forecast = await getForecast(city);
        renderWeather(data, currentUnit);
        renderForecast(forecast);
        saveToHistory(city);
    }
})


// Initialize

renderHistory();