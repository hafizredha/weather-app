<script>
    import { useWeatherStore } from '../stores/weatherStores';
    import { useAirQualityStore } from '../stores/airQualityStores';
    import { computed } from 'vue';
    import CitySearch from './CitySearch.vue';

    export default{
        name: 'Weather',
        components:{
            CitySearch,
        },
        data() {
            return {
                city: 'London', // You can make this dynamic
            };
        },
        setup() {
            const weatherStore = useWeatherStore();
            weatherStore.fetchWeather();

            // Computed property for weather image
            const weatherImage = computed(() => {
                const weatherCode = weatherStore.weather?.current?.weather_code;
                const isDay = weatherStore.weather?.current?.is_day;

                // Call store method to get the correct image
                return weatherStore.getWeatherImage(weatherCode, isDay);
            });

            const airQualityStore = useAirQualityStore();
            airQualityStore.fetchAirQuality();
            return { weatherStore, weatherImage, airQualityStore };
        },
        methods: {
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
                    96: 'Thunderstorm (Hail)',
                    99: 'Thunderstorm (Heavy Hail)'
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
        <CitySearch />
        <img id="main-weather-img" :src="weatherImage" alt="Weather condition image"></img>
        <h1 id="main-temp">{{ Math.round(weatherStore.weather.current.temperature_2m) }}<sup>°C</sup></h1>
        <span id="main-current-day"><p>Kuala Lumpur</p><p>{{ getTodayDay() }}</p></span>
    </section>
    <section id="sub-weather-section" v-if="weatherStore.weather?.current">
        <p><i class="fa-solid fa-cloud"></i> {{ getWeatherDesc(weatherStore.weather.current.weather_code) }}</p>
        <p><i class="fa-solid fa-temperature-low"></i> Min Temperature - {{  Math.round(weatherStore.weather.daily.temperature_2m_min[0]) }}<sup>°C</sup></p>
        <p><i class="fa-solid fa-temperature-high"></i> Max Temperature - {{ Math.round(weatherStore.weather.daily.temperature_2m_max[0]) }}<sup>°C</sup></p>
    </section>
    <section id="bottom-weather-section" class="d-flex justify-content-around cards-style" v-if="weatherStore.weather?.current">
        <div class="d-inline-flex align-items-center gap-2 bottom-weather-info"> 
            <span><img :src="'/storage/water-waves.png'"></img></span> 
            <span>
                <p>{{ weatherStore.weather.current.relative_humidity_2m }}%</p>
                <p>Humidity</p>
            </span>
        </div>
        <div class="d-inline-flex align-items-center gap-2 bottom-weather-info">
            <span><img :src="'/storage/wind.png'"></img></span>   
            <span>
                <p>{{ weatherStore.weather.current.wind_speed_10m }}km/h</p>
                <p>Wind Speed</p>
            </span>
        </div>
    </section>
    <section v-else>
        <p>Loading...</p>
    </section>
</template>

