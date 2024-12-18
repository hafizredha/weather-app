import { defineStore } from "pinia";

export const useWeatherStore = defineStore('weather', {
    state: () => ({
        weather: {},
        weatherImages:{}
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
        getWeatherImage(code, is_day){
            const timeOfDay = is_day?'day':'night';
            switch(code){
                case 0: case 1:
                    return timeOfDay == 'day'?'/storage/clear-day.webp':'/storage/clear-night.webp';
                case 2: case 3:
                    return '/storage/cloudy.webp';
                case 45: case 48:
                    return '/storage/cloud-windy.webp';
                case 51: case 53: case 55: case 61: case 63: case 65: case 80: case 81: case 82:
                    return timeOfDay == 'day'?'/storage/rainy-day.webp':'/storage/rainy-night.webp';
                case 95: case 96: case 99:
                    return '/storage/thunderstorm.webp';
            }
        }
    },
})
