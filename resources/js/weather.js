import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/weather.css';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import VueApexCharts from "vue3-apexcharts";
import Weather from './components/Weather.vue'
import AirQuality from './components/AirQuality.vue'

// Create Vue Application
const app = createApp({
    components: {
        Weather,
        AirQuality,
    },
});

app.use(VueApexCharts);

// Register pinia for state management
const pinia = createPinia();
app.use(pinia);

app.mount('#app');
