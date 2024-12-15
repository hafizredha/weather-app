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
        <ul class="nav nav-pills mb-3" id="weather-tab" role="tablist">
            <li class="nav-item" role="presentation">
                <button class="nav-link active ps-0" id="pills-today-tab" data-bs-toggle="pill" data-bs-target="#pills-today" type="button" role="tab" aria-controls="pills-today" aria-selected="true">Today</button>
            </li>
            <li class="nav-item" role="presentation">
                <button class="nav-link" id="pills-week-tab" data-bs-toggle="pill" data-bs-target="#pills-week" type="button" role="tab" aria-controls="pills-week" aria-selected="false">Week</button>
            </li>
        </ul>
        <div class="tab-content" id="pills-tabContent">
            <div class="tab-pane fade show active" id="pills-today" role="tabpanel" aria-labelledby="pills-today-tab">
                ...
            </div>
            <div class="tab-pane fade" id="pills-week" role="tabpanel" aria-labelledby="pills-week-tab">
                ...
            </div>
        </div>
        {{ weatherStore.weather.current.temperature_2m }}
    </div>
</template>