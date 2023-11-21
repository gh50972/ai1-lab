/*
function XMLHttp() {
    let city=document.getElementById("adres");
    let request = new XMLHttpRequest()

    request.open("GET", "https://api.openweathermap.org/data/2.5/weather?q=Marocco&appid=7ded80d91f2b280ec979100cc8bbba94");
    let url = request.
    request.send();
    request.onload = () => {
        console.log(request);
        if (request.status === 200) {
            console.log(JSON.parse(request.response));
        } else {
            console.log(`error ${request / status} ${request.statusText}`)
        }
    }
}
 */

const WeatherApp = class {
    constructor(apiKey, resultsBlockSelector) {
        this.apiKey = apiKey;
        this.currentWeatherLink = "https://api.openweathermap.org/data/2.5/weather?q={query}&appid={apiKey}&units=metric&lang=pl";
        this.forecastLink = "https://api.openweathermap.org/data/2.5/forecast?q={query}&appid={apiKey}&units=metric&lang=pl";
        this.iconLink = "https://openweathermap.org/img/wn/{iconName}@2x.png";

        this.currentWeatherLink = this.currentWeatherLink.replace("{apiKey}", this.apiKey);
        this.forecastLink = this.forecastLink.replace("{apiKey}", this.apiKey);

        this.currentWeather = undefined;
        this.forecast = undefined;

        this.resultsBlock = document.querySelector(resultsBlockSelector);
    }

    getCW(query) {
        let url = this.currentWeatherLink.replace("{query}", query);
        let req = new XMLHttpRequest();
        req.open("GET", url, true);
        req.addEventListener("load", () => {
            this.currentWeather = JSON.parse(req.responseText);
            console.log(this.currentWeather);
            this.drawWeather();
        });
        req.send();
    }

    getCF(query) {
        let url = this.forecastLink.replace("{query}", query);
        fetch(url).then((response) => {
            return response.json();
        }).then((data) => {
            console.log(data);
            this.forecast = data.list;
            this.drawWeather();
        });
    }



    drawWeather() {
        // clear previous blocks
        this.resultsBlock.innerHTML = '';

        // add current weather block
        if (this.currentWeather) {
            const date = new Date(this.currentWeather.dt * 1000);
            const dateTimeString = `${date.toLocaleDateString("pl-PL")} ${date.toLocaleTimeString("pl-PL")}`;

            const temperature = this.currentWeather.main.temp;
            const feelsLikeTemperature = this.currentWeather.main.feels_like;
            const iconName = this.currentWeather.weather[0].icon;
            const description = this.currentWeather.weather[0].description;

            const weatherBlock = this.createWeatherBlock(dateTimeString, temperature, feelsLikeTemperature, iconName, description);
            this.resultsBlock.appendChild(weatherBlock);
        }

        // add forecast weather blocks
        if (this.forecast && this.forecast.length > 0) {
            for (let i = 0; i < this.forecast.length; i++) {
                let weather = this.forecast[i];
                const date = new Date(weather.dt * 1000);
                const dateTimeString = `${date.toLocaleDateString("pl-PL")} ${date.toLocaleTimeString("pl-PL")}`;

                const temperature = weather.main.temp;
                const feelsLikeTemperature = weather.main.feels_like;
                const iconName = weather.weather[0].icon;
                const description = weather.weather[0].description;

                const weatherBlock = this.createWeatherBlock(dateTimeString, temperature, feelsLikeTemperature, iconName, description);
                this.resultsBlock.appendChild(weatherBlock);
            }
        }
    }

    createWeatherBlock(dateString, temperature, feelsLikeTemperature, iconName, description) {
        let weatherBlock = document.createElement("div");
        weatherBlock.className = "weather";

        let dateBlock = document.createElement("div");
        dateBlock.className = "date";
        dateBlock.innerText = dateString;
        weatherBlock.appendChild(dateBlock);

        let temperatureBlock = document.createElement("div");
        temperatureBlock.className = "temp";
        temperatureBlock.innerHTML = `${temperature} &deg;C`;
        weatherBlock.appendChild(temperatureBlock);

        let feelsLikeBlock = document.createElement("div");
        feelsLikeBlock.className = "temp-like";
        feelsLikeBlock.innerHTML = `Odczuwalna: ${feelsLikeTemperature} &deg;C`;
        weatherBlock.appendChild(feelsLikeBlock);

        let weatherIcon = document.createElement("img");
        weatherIcon.className = "icon";
        weatherIcon.src = this.iconLink.replace("{iconName}", iconName);
        weatherBlock.appendChild(weatherIcon);

        let weatherDescription = document.createElement("div");
        weatherDescription.className = "description";
        weatherDescription.innerText = description;
        weatherBlock.appendChild(weatherDescription);

        return weatherBlock;
    }
}


document.weatherApp = new WeatherApp("7ded80d91f2b280ec979100cc8bbba94", "#results");

document.querySelector("#Pogoda").addEventListener("click", function() {
    const query = document.querySelector("#adres").value;
    document.weatherApp.getCW(query);
    document.weatherApp.getCF(query);
});