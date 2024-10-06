<?php
namespace App\Services;

use Illuminate\Support\Facades\Http;

class AirQualityService{
    private $apiKey;

    public function __construct(){
        $this->apiKey = env('AQI_API_TOKEN');
    }

    public function getAirQuality($city){
        try {
            $response = Http::get('https://api.waqi.info/feed/'.$city.'/', [
                'token' => $this->apiKey,
            ]);

            return $response->json();
        } catch (\Exception $th) {
            return 'AQI Api Error: '.$e->getMessage();
        }
    }
}
?>