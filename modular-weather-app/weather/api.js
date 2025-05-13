import { API_KEY } from "../../env.js";



export async function getWeather(city, unit = "metric") {
    const key = API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=${unit}`

    
    const res = await fetch(url);
    if (!res.ok) throw new Error("City not found.");
    return res.json();
}