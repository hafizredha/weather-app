<template>
    <div v-if="weather">
        <h1>Weather in {{ weather.name }}</h1>
        <p>Temperature: {{ weather.main.temp }}°C</p>
        <p>Condition: {{ weather.weather[0].description }}</p>
        <p>H : {{ weather.main.temp_max }} L : {{ weather.main.temp_min }}</p>
        <p>Feels like {{ weather.main.feels_like }}</p>
    </div>
    <div v-else>
        <p>Loading...</p>
    </div>
</template>

<script>
    export default{
        name: 'Weather',
        data() {
            return {
                weather: null,
                city: 'London', // You can make this dynamic
            };
        },
        mounted() {
            this.fetchWeather();
        },
        methods: {
            async fetchWeather() {
                try {
                    const response = await fetch(`/api/weather/`);
                    const data = await response.json();
                    this.weather = data;
                    console.log('weather');
                    console.log(this.weather);
                } catch (error) {
                    console.error('Error fetching weather data:', error);
                }
            }
        }
    };
</script>