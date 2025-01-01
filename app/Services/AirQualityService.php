<?php
namespace App\Services;

use Illuminate\Support\Facades\Http;

class AirQualityService{
    private $apiKey;

    public function __construct(){
        $this->apiKey = env('AQI_API_TOKEN');
    }

    public function getAirQuality($latitude, $longitude){
        try {
            $response = Http::get('https://api.waqi.info/feed/geo:'.$latitude.';'.$longitude.'/', [
                'token' => $this->apiKey,
            ]);

            return $response->json();
        } catch (\Exception $th) {
            return 'AQI Api Error: '.$e->getMessage();
        }
    }

    public function getUvIndex($latitude, $longitude){
        try{
            $apiUrl = "https://air-quality-api.open-meteo.com/v1/air-quality";
            $response = Http::get($apiUrl, [
                'latitude' => $latitude,
                'longitude' => $longitude,
                'current' => 'european_aqi,us_aqi,uv_index'
            ]);

            return $response->json();
        } catch (\Exception $th) {
            return 'OpenWeather UV Index Api Error: '.$e->getMessage();
        }
    }
}
?>