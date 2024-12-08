<template>
    <div v-if="weather">
        <h1>Current Weather</h1>
        <p>Temperature: {{ weather.current.temperature_2m }}°C</p>
        <p>Condition: {{ weather.current.weather_code }}</p>
        <p>Time: {{  weather.current.time }}</p>
        <p>is Day: {{ weather.current.is_day }}</p>
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