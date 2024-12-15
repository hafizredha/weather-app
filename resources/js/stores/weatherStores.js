import { defineStore } from "pinia";

export const useWeatherStore = defineStore('weather', {
    state: () => ({
        weather: {},
        weatherImages:{
            day: {
                0: '/storage/clear-day.webp',
                1: '/storage/cloudy.webp',
                2: '/storage/cloudy.webp',
                3: '/storage/cloudy.webp',
                45: '/storage/cloudy-windy.webp',
                48: '/storage/cloudy-windy.webp',
                51: '/storage/rainy.webp',
                53: '/storage/rainy.webp',
                55: '/storage/rainy.webp',
                61: '/storage/rainy-day.webp',
                63: '/storage/rainy-day.webp',
                65: '/storage/rainy-day.webp',
                80: '/storage/rainy-day.webp',
                81: '/storage/rainy-day.webp',
                82: '/storage/rainy-day.webp',
                95: '/storage/thunderstorm.webp',
            },
            night: {
                0: '/storage/clear-night.webp',
                1: '/storage/cloudy.webp',
                2: '/storage/cloudy.webp',
                3: '/storage/cloudy.webp',
                45: '/storage/cloudy-windy.webp',
                48: '/storage/cloudy-windy.webp',
                51: '/storage/rainy.webp',
                53: '/storage/rainy.webp',
                55: '/storage/rainy.webp',
                61: '/storage/rainy-night.webp',
                63: '/storage/rainy-night.webp',
                65: '/storage/rainy-night.webp',
                80: '/storage/rainy-night.webp',
                81: '/storage/rainy-night.webp',
                82: '/storage/rainy-night.webp',
                95: '/storage/thunderstorm.webp',
            },
        }
    }),
    actions: {
        async fetchWeather() {
            try {
                const response = await fetch('/api/weather/');
                this.weather = await response.json();
                this.getWeatherImage(this.weather.current.weather_code,this.weather.current.is_day);
                console.log(this.weather);
            } catch (error) {
                console.error('Error fetching weather:', error);
            }
        },
    },
    getters:{
        getWeatherImage: (state) => (code, is_day) => {
            const timeOfDay = is_day?'day':'night';
            return state.weatherImages[timeOfDay][code];
        },
    }
})
