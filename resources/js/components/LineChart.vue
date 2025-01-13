<script>
    import { includes } from 'lodash';
import { useWeatherStore } from '../stores/weatherStores';
import { computed } from 'vue';

    export default{
        name: 'LineChart',
        setup(){
            const weatherStore = useWeatherStore();
            const weatherTime = computed(() => { return weatherStore.weather.hourly.time; });
            const weatherPre = computed(() => { return weatherStore.weather.hourly.precipitation_probability; });

            const startOfDay = computed(() => { return weatherStore.getDatetimeRangeForToday(); });
            
            return { weatherStore, weatherTime, weatherPre, startOfDay };
        },
        data() {
            return{
                series: [{
                    name: "Precipitation %",
                    data: '',
                }],
                chartOptions: {
                    chart:{
                        type: 'area',
                        height: '221px',
                        zoom: {
                            enabled: false,
                        },
                        toolbar:{
                            show: false,
                        },
                        redrawOnParentResize: true
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
                        offsetX: 10,
                        offsetY: 30,
                        style:{
                            color: '#FFFFFF',
                            fontWeight: '400',
                            fontSize: '1rem',
                            fontFamily:  'Plus Jakarta Sans',
                        }
                    },
                    labels: '',
                    // theme: 'dark',
                    grid: {
                        xaxis: {
                            lines: {
                                show: false,
                            }
                        },
                        borderColor: '#6A6969',
                        strokeDashArray: 2,
                    },
                    xaxis: {
                        axisBorder: {
                            show: false
                        },
                        axisTicks: {
                            show: false
                        },
                        labels: {
                            maxHeight: 20,
                            style: {
                                fontSize: '8px',
                                colors: '#6A6969',
                            }
                        }
                    },
                    yaxis: {
                        labels: {
                            style: {
                                fontSize: '8px',
                                colors: '#6A6969',
                            }
                        }
                    },
                    colors: ['#6A6969'],
                    fill: {
                        type: "gradient",
                        gradient: {
                            shadeIntensity: 1.25,
                            opacityFrom: 1,
                            opacityTo: 0,
                            stops: [0, 95],
                            colorStops: [
                                {
                                    offset: 0,
                                    opacity: 0.7,
                                    color: '#6A6969',
                                },
                                {
                                    offset: 95,
                                    opacity: 0,
                                    color: '#6A6969',
                                }
                            ]
                        }
                    },
                    tooltip: {
                        theme: 'dark',
                    },
                }
            }
            
        },
        watch: {
            // Watch for changes in weatherStore data and call filterWeatherData
            weatherTime: 'filterWeatherData',
        },
        methods: {
            filterWeatherData() {
                // Filter weatherStore data for entries within today's range
                const filteredData = this.weatherTime
                    .filter((time) => time >= this.startOfDay)
                    .splice(0, 7);

                // Change time format for chart label
                const chartLabels = filteredData.map((datetime) => new Date(datetime).toLocaleTimeString([], { hour: "numeric",}));

                // Get index number of filteredData
                const index = this.weatherTime
                    .map((time, i) => (filteredData.includes(time)?i:-1))
                    .filter(i => i !== -1);

                // Get precipitation value based on index number
                const precipitation = index.map(i => this.weatherPre[i]);
                
                // Update the series and labels for the chart
                this.series[0].data = precipitation; // Mock data for demonstration
                this.chartOptions.labels = chartLabels;
            },
        },
        mounted() {
            // Filter data when the component is mounted
            this.filterWeatherData();
        },
    }
</script>

<template>
    <apexchart height="177" :options="chartOptions" :series="series"></apexchart>
</template>