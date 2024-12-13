import { defineStore } from "pinia";

export const useAirQualityStore = defineStore('air_quality', {
    state: () => ({
        air_quality: {},
    }),
    actions: {
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
        },
    }
});