import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/weather.css';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import Weather from './components/Weather.vue'
import AirQuality from './components/AirQuality.vue'

// Create Vue Application
const app = createApp({
    components: {
        Weather,
        AirQuality,
    },
});

// Register pinia for state management
const pinia = createPinia();
app.use(pinia);

app.mount('#app');
