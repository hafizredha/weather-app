import { defineStore } from "pinia";

export const useWeatherStore = defineStore('weather', {
    state: () => ({
        weather: {},
    }),
    actions: {
        async fetchWeather() {
            try {
                const response = await fetch('/api/weather/');
                this.weather = await response.json();
                console.log(this.weather);
            } catch (error) {
                console.error('Error fetching weather:', error);
            }
        },
    },
})
