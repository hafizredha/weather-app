<script>
    import { useWeatherStore } from '../stores/weatherStores';
    import { useAirQualityStore } from '../stores/airQualityStores';
    export default{
        name: 'AirQuality',
        setup(){
            const weatherStore = useWeatherStore();
            const airQualityStore = useAirQualityStore();
            return { weatherStore, airQualityStore };
        }
    }
</script>

<template>
    <div v-if="weatherStore.weather?.current">
        {{ weatherStore.weather.current.temperature_2m }}
    </div>
</template>