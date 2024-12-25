import { defineStore } from "pinia";

export const useWeatherStore = defineStore('weather', {
    state: () => ({
        weather: {},
        weatherImages: {},
        weatherHourly: {}
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
        },
        getDatetimeRangeForToday() {
            const now = new Date();
            const year = now.getFullYear();
            const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are zero-based
            const day = String(now.getDate()).padStart(2, '0');
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');

            const startOfDay = `${year}-${month}-${day}T${hours}:${minutes}`;

            return startOfDay;
        },
        getTimeToday(hourly){
            const times = hourly?.time || [];
            if (!times.length) {
                console.warn("weatherTime is empty or not defined.");
                return { todayTime: [], todayTemp: [], todayWeatherCode: [] };
            }

            const startOfDay = this.getDatetimeRangeForToday();

            const filteredData = times
                .filter((time) => time >= startOfDay)
                .slice(0, 7);
            
            const todayTime = filteredData.map((datetime) =>
                new Date(datetime).toLocaleTimeString([], { hour: "numeric" })
            );

            const index = filteredData.map((time) => times.indexOf(time));
            const todayTemp = index.map((i) => hourly.temperature_2m[i]);
            const todayWeatherCode = index.map((i) => hourly.weather_code[i]);

            return { todayTime, todayTemp, todayWeatherCode };
        }
    },
})
