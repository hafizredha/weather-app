<template>
    <div>
        
    </div>
</template>

<script>
    export default{
        mounted(){
            this.fetchAirQuality();
        },
        methods: {
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
            }
        }
    }
</script>