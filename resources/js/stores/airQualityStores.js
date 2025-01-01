import { defineStore } from "pinia";

export const useAirQualityStore = defineStore('air_quality', {
    state: () => ({
        air_quality: {},
    }),
    actions: {
        async fetchAirQuality(latitude = null, longitude = null){
            try {
                const params = new URLSearchParams();
                if (latitude !== null && longitude !== null) {
                    params.append('latitude', latitude);
                    params.append('longitude', longitude);
                }
                const response = await fetch(`/api/air-quality?${params.toString()}`);
                const data = await response.json();
                this.air_quality = data;
                console.log('air quality');
                console.log(this.air_quality);
            } catch (error) {
                console.error('Error fetching air quality data:', error);
            }
        },
    }
});