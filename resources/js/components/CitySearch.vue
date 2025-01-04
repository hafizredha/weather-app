<script>
import { useWeatherStore } from '../stores/weatherStores';
import { useAirQualityStore } from '../stores/airQualityStores';
    export default{
        name: 'CitySearch',
        data(){
            return {
                query: '',
                cities: [],
            }
        },
        methods: {
            debounce(func, delay) {
                let timeout;
                return function(...args) {
                    clearTimeout(timeout);
                    timeout = setTimeout(() => func.apply(this, args), delay);
                };
            },
            fetchSuggestions(){
                if (this.query.length > 2) {
                    fetch(`/api/cities?query=${this.query}`)
                        .then(response => response.json())
                        .then(data => {
                            this.cities = data.results;
                            console.log(this.cities);
                        })
                        .catch(error => {
                            console.error('Error fetching cities:', error);
                            this.cities = [];
                        });
                } else {
                    this.cities = [];
                }
            },
            async selectCity(city) {
                this.query = `${city.name}, ${city.country}`;
                this.cities = [];

                // Fetch weather based on city selected
                const weatherStore = useWeatherStore();
                const airQualityStore = useAirQualityStore();

                await Promise.all([
                    weatherStore.fetchWeather(city.latitude, city.longitude),
                    airQualityStore.fetchAirQuality(city.latitude, city.longitude),
                ]);

                // Emit the city name to the parent
                this.$emit('city-selected', city.name);
            },
            checkCitiesValue(){
                this.query = '';
            }
        },
        created() {
            // Bind debounced function
            this.debouncedFetchSuggestions = this.debounce(this.fetchSuggestions, 300); // 300ms delay
        },
    }
</script>

<template>
    <div id="city-search">
        <i class="fa-solid fa-magnifying-glass"></i>
        <input  
        :class="[this.cities.length > 0? 'input-dropdown': '']" 
        type="text" 
        v-model="query" 
        @input="debouncedFetchSuggestions" 
        @click="checkCitiesValue"
        placeholder="Search city.."
        />
        <transition name="dropdown">
            <ul id="cities-result" v-if="cities.length > 0">
                <li 
                    v-for="(city, index) in cities" 
                    :key="index" 
                    @click="selectCity(city)"
                >
                    {{ city.name }}, {{ city.country }}
                </li>
            </ul>
        </transition>
    </div>
    
</template>