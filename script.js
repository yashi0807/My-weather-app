const apiKey = "25682bead710a57169516f1ba57cac32";
const searchBtn = document.getElementById("search-btn");
const cityInput = document.getElementById("city-input");

async function checkWeather(city) {
    if(!city) return;

    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${apiKey}`);
        
        if (response.status == 404) {
            alert("City spelling check karo!");
            return;
        }

        const data = await response.json();

        // Update UI
        document.getElementById("city").innerHTML = data.name;
        document.getElementById("temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.getElementById("description").innerHTML = data.weather[0].description;
        document.getElementById("humidity").innerHTML = data.main.humidity + "%";
        document.getElementById("wind").innerHTML = data.wind.speed + " km/h";

        // Icon Update
        const iconCode = data.weather[0].icon;
        document.getElementById("weather-icon").src = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

        // Animation Reset
        const weatherDiv = document.querySelector(".weather");
        weatherDiv.style.animation = 'none';
        weatherDiv.offsetHeight; 
        weatherDiv.style.animation = null;

        // Dynamic Backgrounds
        const card = document.querySelector(".card");
        const main = data.weather[0].main;

        if (main === "Clouds") card.style.background = "linear-gradient(135deg, #757f9a, #2c3e50)";
        else if (main === "Clear") card.style.background = "linear-gradient(135deg, #f39c12, #d35400)";
        else if (main === "Rain") card.style.background = "linear-gradient(135deg, #3498db, #2c3e50)";
        else if (main === "Mist" || main === "Haze") card.style.background = "linear-gradient(135deg, #bdc3c7, #2c3e50)";
        else card.style.background = "linear-gradient(135deg, #00feba, #5b548a)";

    } catch (err) {
        console.log("Error fetching data");
    }
}

// Event Listeners
searchBtn.addEventListener("click", () => checkWeather(cityInput.value));
cityInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") checkWeather(cityInput.value);
});

// LIVE AUTO-UPDATE: Har 10 min mein refresh hoga agar koi city searched hai
setInterval(() => {
    const currentCity = document.getElementById("city").innerHTML;
    if(currentCity !== "Search City") {
        checkWeather(currentCity);
    }
}, 600000);