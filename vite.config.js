import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue'; // Import Vue plugin
import laravel from 'laravel-vite-plugin';

export default defineConfig({
    plugins: [
        laravel({
            input: [
                'resources/css/app.css', 
                'resources/js/app.js', 
                'resources/js/weather.js',
                'resources/js/hourly-weather.js'
            ], 
            refresh: true,
        }),
        vue(),
    ],
    server: {
        watch: {
            usePolling: true // Needed if using wsl
        },
        proxy: {
            '/api': {
                target: 'http://localhost:8000', // Laravel's URL
                changeOrigin: true,
            },
        },
        hmr: {
            host: 'localhost',
            protocol: 'ws',
        },
    },
    define: {
        '__VUE_PROD_HYDRATION_MISMATCH_DETAILS__': true,
    },
});
