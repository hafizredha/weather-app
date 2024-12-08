<?php
namespace App\Services;

use Illuminate\Support\Facades\Http;

class WeatherService{
    private $apiKey;

    public function __construct() {
        $this->apiKey = env('WEATHER_API_TOKEN');
    }

    public function getWeather($cityId){
        try {
            $defaultLalitude = "3.085";
            $defaultLongitude = "101.532";
            $apiUrl = "https://api.open-meteo.com/v1/forecast";
            $response = Http::get($apiUrl, [
                'latitude'    => $defaultLalitude,
                'longitude' => $defaultLongitude,
                'current'   => 'temperature_2m,is_day,weather_code',
                'hourly'    => 'temperature_2m,precipitation_probability',
                'daily'     => 'weather_code,temperature_2m_max,sunrise,sunset,precipitation_hours',
                'timezone'  => 'auto',
            ]);
            
            return $response->json();
        } catch (\Exception $e) {
            return 'OpenWeather Api Error: '.$e->getMessage();
        }
        
    }
}
?>