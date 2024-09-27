<template>
    <div>
        
    </div>
</template>

<script>
    export default{
        mounted(){
            this.fetchHourlyWeather();
        },
        methods: {
            async fetchHourlyWeather(){
                try {
                    const response = await fetch(`/api/hourly-weather/`);
                    const data = await response.json();
                    this.hourly_weather = data;
                    console.log('hourly weather');
                    console.log(this.hourly_weather);
                } catch (error) {
                    console.error('Error fetching hourly weather data:', error);
                }
            }
        }
    }
</script>