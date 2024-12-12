<script>
    import { useWeatherStore } from '../stores/weatherStores';
    export default{
        name: 'Weather',
        data() {
            return {
                city: 'London', // You can make this dynamic
                weatherImages: {
                    day: {
                        0: '/storage/clear-day.png',
                        1: '/storage/cloudy.png',
                        2: '/storage/cloudy.png',
                        3: '/storage/cloudy.png',
                        45: '/storage/cloudy-windy.png',
                        48: '/storage/cloudy-windy.png',
                        51: '/storage/rainy.png',
                        53: '/storage/rainy.png',
                        55: '/storage/rainy.png',
                        61: '/storage/rainy-day.png',
                        63: '/storage/rainy-day.png',
                        65: '/storage/rainy-day.png',
                        80: '/storage/rainy-day.png',
                        81: '/storage/rainy-day.png',
                        82: '/storage/rainy-day.png',
                        95: '/storage/thunderstorm.png',
                    },
                    night: {
                        0: '/storage/clear-night.png',
                        1: '/storage/cloudy.png',
                        2: '/storage/cloudy.png',
                        3: '/storage/cloudy.png',
                        45: '/storage/cloudy-windy.png',
                        48: '/storage/cloudy-windy.png',
                        51: '/storage/rainy.png',
                        53: '/storage/rainy.png',
                        55: '/storage/rainy.png',
                        61: '/storage/rainy-night.png',
                        63: '/storage/rainy-night.png',
                        65: '/storage/rainy-night.png',
                        80: '/storage/rainy-night.png',
                        81: '/storage/rainy-night.png',
                        82: '/storage/rainy-night.png',
                        95: '/storage/thunderstorm.png',
                    },
                },
            };
        },
        setup() {
            const weatherStore = useWeatherStore();
            weatherStore.fetchWeather();
            return { weatherStore };
        },
        methods: {
            getWeatherImage(code, is_day){
                const timeOfDay = is_day?'day':'night';
                return this.weatherImages[timeOfDay][code];
            },
            getWeatherDesc(code){
                const weatherDesc = {
                    0: 'Clear Sky',
                    1: 'Mainly Clear',
                    2: 'Partly Cloudy',
                    3: 'Overcast',
                    45: 'Fog',
                    48: 'Depositing Rime Fog',
                    51: 'Light Drizzle',
                    61: 'Light Rain',
                    71: 'Light Snow',
                    80: 'Slight Rain Shower',
                    81: 'Moderate Rain Shower',
                    82: 'Heavy Rain Shower',
                    95: 'Thunderstorm',
                }

                return weatherDesc[code];
            },
            getTodayDay(){
                const date = new Date();
                let day = date.getDay();
                const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
                return weekday[day];
            }
        }
    };
</script>

<template>
    <section id="main-weather-section" v-if="weatherStore.weather?.current">
        <img id="main-weather-img" :src="getWeatherImage(weatherStore.weather.current.weather_code, weatherStore.weather.current.is_day)" alt="Weather condition image"></img>
        <h1 id="main-temp">{{ Math.round(weatherStore.weather.current.temperature_2m) }}<sup>°C</sup></h1>
        <span id="main-current-day"><p>Kuala Lumpur</p><p>{{ getTodayDay() }}</p></span>
    </section>
    <section id="sub-weather-section" v-if="weatherStore.weather?.current">
        <p><i class="fa-solid fa-cloud"></i> {{ getWeatherDesc(weatherStore.weather.current.weather_code) }}</p>
        <p><i class="fa-solid fa-temperature-low"></i> Min Temperature - {{  Math.round(weatherStore.weather.daily.temperature_2m_min[0]) }}<sup>°C</sup></p>
        <p><i class="fa-solid fa-temperature-high"></i> Max Temperature - {{ Math.round(weatherStore.weather.daily.temperature_2m_max[0]) }}<sup>°C</sup></p>
    </section>
    <section v-else>
        <p>Loading...</p>
    </section>
</template>

