import './style.scss';

import { format, parse } from "@formkit/tempo";

const readable = format(new Date(), "full");
// понедельник, 19 февр. 2024 г.

parse(readable, "full");
console.log(readable);

const wetherInfoContent = document.querySelector('.weather-info-content');

// const date = new Date();

async function getWeatherCardData() {
    const response = await fetch('http://api.weatherapi.com/v1/current.json?key=27ee5d2bbc35470e831125920242803&q=Belarus&aqi=no');
    const data = await response.json();

    const temp = data.current.temp_c < 0 ? '-' + data.current.temp_c : '+' + data.current.temp_c;

    console.log(data);
    renderWeatherDay(data.location.localtime, temp, data.current.feelslike_c, data.current.condition.icon);
}
console.log(getWeatherCardData());

function renderWeatherDay(date, currentTemp, temp, img) {
    const weather = document.createElement('li');
    const weatherInfo = document.createElement('div');
    const weatherInfoDate = document.createElement('div');
    const weatherInfoDay = document.createElement('div');
    const weatherInfoTemperature = document.createElement('div');
    const weatherInfoCurrentTemperature = document.createElement('div');
    const weatherInfoFeelslikeTemperature = document.createElement('div');
    const weatherImage = document.createElement('div');

    weather.classList.add('weather');
    weatherInfo.classList.add('weather-info');
    weatherImage.classList.add('weather-image');
    weatherInfoDate.classList.add('weather-info-date');
    weatherInfoTemperature.classList.add('weather-info-temperature');
    weatherInfoCurrentTemperature.classList.add('weather-info-current-temperature');
    weatherInfoFeelslikeTemperature.classList.add('weather-info-today-temperature');
    weatherInfoDay.classList.add('weather-info-day');

    weatherInfoDate.textContent = `${date}`;
    // weatherInfoDay.textContent = `${day}`;
    weatherInfoCurrentTemperature.textContent = `${currentTemp}`;
    weatherInfoFeelslikeTemperature.textContent = `Ощущается как ${temp}`;
    weatherImage.innerHTML = `<img src="${img}">`;

    weatherInfoTemperature.append(weatherInfoCurrentTemperature);
    weatherInfoTemperature.append(weatherInfoFeelslikeTemperature);

    weatherInfo.append(weatherInfoDate);
    weatherInfo.append(weatherInfoDay);
    weatherInfo.append(weatherInfoTemperature);

    weather.append(weatherInfo);
    weather.append(weatherImage);

    wetherInfoContent.append(weather);
}
// renderWeatherDay('Вт, 2 апр', 26, 20);



