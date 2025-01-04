<script>
    import $ from 'jquery';
    import { useWeatherStore } from '../stores/weatherStores';
    import { useAirQualityStore } from '../stores/airQualityStores';
    import { computed } from 'vue';
    import LineChart from './LineChart.vue';

    export default{
        name: 'AirQuality',
        aqi: '',
        pressure: '',
        uvi: '',
        components: {
            LineChart,
        },
        setup(){
            const weatherStore = useWeatherStore();
            const airQualityStore = useAirQualityStore();

            // 
            const getWeatherImage = (code, is_day) => weatherStore.getWeatherImage(code, is_day);
            const weatherTime = computed(() => weatherStore.weather?.hourly?.time || null);
            const todayWeatherData = computed(() => weatherStore.getTimeToday(weatherStore.weather?.hourly));
            
            // const startOfDay = computed(() => { return weatherStore.getDatetimeRangeForToday(); });
            const aqi = computed(() => airQualityStore.air_quality?.data?.aqi || null);
            const pressure = computed(() => airQualityStore.air_quality?.data?.iaqi?.p?.v || 'N/A');
            const uvi = computed(() => Math.round(airQualityStore.air_quality?.uv_index?.current?.uv_index) || null);

            return { weatherStore, getWeatherImage, airQualityStore, aqi, pressure, uvi, weatherTime, todayWeatherData };
        },
        methods:{
            getDayFromDate(dayDate){
                const date = new Date(dayDate);
                const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
                return daysOfWeek[date.getDay()];
            },
            hideTab(){
                $('#pills-today').addClass('hide-tab');
                $('#pills-week').removeClass('hide-tab');
            },
            showTab(){
                $('#pills-week').addClass('hide-tab');
                $('#pills-today').removeClass('hide-tab');
            }
        },
    }
</script>

<template>
    <div v-if="weatherStore.weather?.daily">
        <ul class="nav nav-pills mb-4 mb-lg-5 mb-xxl-5" id="weather-tab" role="tablist">
            <li class="nav-item" role="presentation">
                <button class="nav-link active ps-0" id="pills-today-tab" @click="showTab()" data-bs-toggle="pill" data-bs-target="#pills-today" type="button" role="tab" aria-controls="pills-today" aria-selected="true">Today</button>
            </li>
            <li class="nav-item" role="presentation">
                <button class="nav-link" id="pills-week-tab" @click="hideTab()" data-bs-toggle="pill" data-bs-target="#pills-week" type="button" role="tab" aria-controls="pills-week" aria-selected="false">Week</button>
            </li>
        </ul>
        <div class="tab-content mb-4 mb-lg-5 mb-xxl-5" id="pills-tabContent">
            <div class="tab-pane fade show active d-inline-flex gap-3 justify-content-between" id="pills-today" role="tabpanel" aria-labelledby="pills-today-tab">
                <div v-for="(value, n) in todayWeatherData.todayTime" class="d-flex flex-column gap-2 align-items-center p-2 cards-style forecast-info">
                    <p class="mb-0">{{ value }}</p>
                    <img style="width: 100%;max-width: 70px;" :src="getWeatherImage(todayWeatherData.todayWeatherCode[n], 1)">
                    <p class="mb-0">{{ Math.round(todayWeatherData.todayTemp[n]) }}<sup>°C</sup></p>
                </div>
            </div>
            <div class="tab-pane fade d-inline-flex gap-3 justify-content-between hide-tab" id="pills-week" role="tabpanel" aria-labelledby="pills-week-tab">
                <div v-for="(index, n) in 7" class="d-flex flex-column gap-2 align-items-center p-2 cards-style forecast-info">
                    <p class="mb-0">{{ getDayFromDate(weatherStore.weather.daily.time[n]) }}</p>
                    <img style="width: 100%;max-width: 70px;" :src="getWeatherImage(weatherStore.weather.daily.weather_code[n], 1)">
                    <p class="mb-0">{{ Math.round((weatherStore.weather.daily.temperature_2m_max[n]+weatherStore.weather.daily.temperature_2m_min[n])/2) }}<sup>°C</sup></p>
                </div>
            </div>
        </div>

        <div class="mb-4 mb-xxl-5" v-if="airQualityStore.air_quality?.data">
            <p id="today-title" class="mb-4 mb-xxl-5">Today's Overview</p>
            <div class="row gx-3">
                <div class="col-md-4 col-xs-6 mb-3">
                    <div class="d-flex flex-column gap-3 cards-style px-3 py-3">
                        <p>Air Quality Index</p>
                        <div class="d-flex justify-content-between align-items-end">
                            <div class="d-flex gap-2 flex-column justify-content-around">
                                <h1>{{ aqi }}</h1>
                                <p class="good-level" v-if="aqi <= 50">Good</p>
                                <p class="moderate-level" v-if="aqi > 50 && aqi <= 100">Moderate</p>
                                <p class="unhealthy-sensitive-level" v-if="aqi > 100 && aqi <= 150">Unhealthy<span>for Sensitive Group</span></p>
                                <p class="unhealthy-level" v-if="aqi > 150 && aqi <= 200">Unhealthy</p>
                                <p class="very-unhealthy-level" v-if="aqi > 200 && aqi <= 300">Very Unhealthy</p>
                                <p class="hazardous-level" v-if="aqi > 300">Hazardous</p>
                            </div>
                            <img style="width: 100%; max-width: 60px; max-height: 60px;" :src="'/storage/air-pollution.png'">
                        </div>
                    </div>
                </div>
                <div class="col-md-4 col-xs-6">
                    <div class="d-flex flex-column gap-3 cards-style px-3 py-3">
                        <p>UV Index</p>
                        <div class="d-flex justify-content-between align-items-end">
                            <div class="d-flex gap-2 flex-column justify-content-around">
                                <h1>{{ uvi > 0?uvi:1 }}</h1>
                                <p class="good-level" v-if="uvi <= 2">Low</p>
                                <p class="moderate-level" v-if="uvi > 2 && uvi <= 5">Moderate</p>
                                <p class="unhealthy-sensitive-level" v-if="uvi > 5 && uvi <= 7">High</p>
                                <p class="unhealthy-level" v-if="uvi > 7 && uvi <= 10">Very High</p>
                                <p class="hazardous-level" v-if="uvi > 10">Extreme</p>
                            </div>
                            <img style="width: 100%; max-width: 60px; max-height: 60px;" :src="'/storage/uv.png'">
                        </div>
                    </div>
                </div>
                <div class="col-md-4 col-xs-6">
                    <div class="d-flex flex-column gap-3 cards-style px-3 py-3">
                        <p>Pressure (hPa)</p>
                        <div class="d-flex justify-content-between align-items-end">
                            <div class="d-flex gap-2 flex-column justify-content-around">
                                <h1>{{ pressure }}</h1>
                                <p class="moderate-level" v-if="pressure <= 1009">Low</p>
                                <p class="good-level" v-else-if="pressure > 1009 && pressure <= 1022">Normal</p>
                                <p class="unhealthy-level" v-else-if="pressure > 1022">High</p>
                                <p v-else>N/A</p>
                            </div>
                            <img style="width: 100%; max-width: 60px; max-height: 60px;" :src="'/storage/barometer.png'">
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="row gx-3">
            <div class="col-md-8">
                <div class="cards-style">
                    <LineChart />
                </div>
            </div>
            <div class="col-md-4">
                <div class="d-flex flex-column gap-2 cards-style px-3 py-3 h-100">
                    <p>Sunrise & Sunset</p>
                    <div class="row align-items-center">
                        <div class="col-md-4">
                            <img style="max-width: 48px;" :src="'/storage/sunrise.webp'" />
                        </div>
                        <div class="col-md-8">
                            Sunrise<br/>{{ new Date(weatherStore.weather.daily.sunrise[0]).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }) }}
                        </div>
                    </div>
                    <div class="row align-items-center">
                        <div class="col-md-4">
                            <img style="max-width: 48px;" :src="'/storage/sunset.webp'" />
                        </div>
                        <div class="col-md-8">
                            Sunset<br/>{{ new Date(weatherStore.weather.daily.sunset[0]).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }) }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>