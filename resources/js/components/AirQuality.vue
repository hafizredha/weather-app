<script>
    import { useWeatherStore } from '../stores/weatherStores';
    export default{
        name: 'AirQuality',
        data() {
            return {
                air_quality: null,
            };
        },
        setup(){
            const weatherStore = useWeatherStore();
            return { weatherStore };
        },
        mounted(){
            this.fetchAirQuality();
        },
        methods: {
            async fetchAirQuality(){
                try {
                    const response = await fetch(`/api/air-quality/`);
                    const data = await response.json();
                    this.air_quality = data;
                    console.log('air quality');
                    console.log(this.air_quality);
                } catch (error) {
                    console.error('Error fetching air quality data:', error);
                }
            }
        }
    }
</script>

<template>
    <div v-if="weatherStore.weather?.current">
        {{ weatherStore.weather.current.temperature_2m }}
    </div>
</template>