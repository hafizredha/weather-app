import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createApp } from 'vue';
import Weather from './components/Weather.vue'
import AirQuality from './components/AirQuality.vue'

createApp(Weather).mount('#app');
createApp(AirQuality).mount('#air');
