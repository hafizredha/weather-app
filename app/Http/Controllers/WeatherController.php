<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\WeatherService;

class WeatherController extends Controller
{
    protected $weatherService;

    public function __construct(WeatherService $weatherService){
        $this->weatherService = $weatherService;
    }

    public function weatherInfo(Request $request){
        try {
            $latitude = $request->input('latitude');
            $longitude = $request->input('longitude');
            
            if($latitude && $longitude){
                $weatherData = $this->weatherService->getWeather($latitude, $longitude);
            }else{
                $weatherData = $this->weatherService->getWeather();
            }

            return $weatherData;
        } catch (\Exception $e) {
            // Log the error and return a server error response
            \Log::error('Weather API Error: ' . $e->getMessage());
            return response()->json(['error' => 'Server Error'], 500);
        }
    }
}
