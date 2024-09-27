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

    public function weatherInfo(){
        try {
            $cityId = 1733046;
            $weatherData = $this->weatherService->getWeather($cityId);

            return $weatherData;
        } catch (\Exception $e) {
            // Log the error and return a server error response
            \Log::error('Weather API Error: ' . $e->getMessage());
            return response()->json(['error' => 'Server Error'], 500);
        }
    }

    public function hourlyWeatherInfo(){
        $cityId = 1733046;
        $hourlyWeatherData = $this->weatherService->getHourlyWeather($cityId);

        return $hourlyWeatherData;
    }
}
