<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\AirQualityService;

class AirQualityController extends Controller
{
    protected $airQualityService;

    public function __construct(AirQualityService $airQualityService){
        $this->airQualityService = $airQualityService;
    }

    public function airQualityInfo(){
        $city = 'Kuala Lumpur';
        $airQualityData = $this->airQualityService->getAirQuality($city);

        return $airQualityData;
    }
}
