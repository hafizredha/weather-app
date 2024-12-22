<script>
    import { includes } from 'lodash';
import { useWeatherStore } from '../stores/weatherStores';

    export default{
        name: 'LineChart',
        setup(){
            const weatherStore = useWeatherStore();
            const weatherTime = weatherStore.weather.hourly.time;
            const weatherPre = weatherStore.weather.hourly.precipitation_probability;
            
            return { weatherStore, weatherTime, weatherPre };
        },
        data() {
            return{
                series: [{
                    name: "Desktop",
                    data: '',
                }],
                chartOptions: {
                    chart:{
                        height: 350,
                        type: 'area',
                        zoom: {
                            enabled: false,
                        }
                    },
                    dataLabels: {
                        enabled: false,
                    },
                    stroke: {
                        curve: 'smooth',
                    },
                    title: {
                        text: 'Precipitation Probability',
                        align: 'left',
                    },
                    labels: '',
                    fill: {
                        type: "gradient",
                    },
                }
            }
            
        },
        methods: {
            getDatetimeRangeForToday() {
                const now = new Date();
                const year = now.getFullYear();
                const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are zero-based
                const day = String(now.getDate()).padStart(2, '0');
                const hours = String(now.getHours()).padStart(2, '0');
                const minutes = String(now.getMinutes()).padStart(2, '0');

                const endDay = String(now.getDate() + 1).padStart(2, '0');

                const startOfDay = `${year}-${month}-${day}T${hours}:${minutes}`;
                const endOfDay = `${year}-${month}-${endDay}T00:00`;

                return { startOfDay, endOfDay };
            },
            filterWeatherData() {
                const { startOfDay, endOfDay } = this.getDatetimeRangeForToday();
                // Filter weatherStore data for entries within today's range
                const filteredData = this.weatherTime.filter((time) => {
                    return time >= startOfDay && time <= endOfDay;
                });

                // Get index number of filteredData
                const index = this.weatherTime
                    .map((time, i) => (filteredData.includes(time)?i:-1))
                    .filter(i => i !== -1);

                console.log(index);

                // Get precipitation value based on index number
                const precipitation = index.map(i => this.weatherPre[i]);

                console.log(precipitation);
                
                // Update the series and labels for the chart
                this.series[0].data = precipitation; // Mock data for demonstration
                this.chartOptions.labels = filteredData;
            },
        },
        mounted() {
            // Filter data when the component is mounted
            this.filterWeatherData();
        },
    }
</script>

<template>
    <div>
        <apexchart type="line" height="350" :options="chartOptions" :series="series"></apexchart>
    </div>
</template>