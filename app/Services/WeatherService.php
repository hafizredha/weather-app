<?php
namespace App\Services;

use Illuminate\Support\Facades\Http;

class WeatherService{
    private $apiKey = '811862d1cb35f3dd6401637a4a25cac1';

    public function getWeather($cityId){
        try {
            $response = Http::get("https://api.openweathermap.org/data/2.5/weather", [
                'id'    => $cityId,
                'appid' => $this->apiKey,
                'units' => 'metric',
            ]);
            
            return $response->json();
        } catch (\Exception $e) {
            return 'OpenWeather Api Error: '.$e->getMessage();
        }
        
    }

    public function getHourlyWeather($cityId){
        try {
            $response = Http::get("https://api.openweathermap.org/data/2.5/forecast", [
                'id'    => $cityId,
                'appid' => $this->apiKey,
                'units' => 'metric',
            ]);
            
            return $response->json();
        } catch (\Exception $e) {
            return 'OpenWeather Api Error: '.$e->getMessage();
        } 
    }
}
?>