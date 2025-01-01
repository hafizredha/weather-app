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

    public function airQualityInfo(Request $request){
        $lat = $request->input('latitude');
        $long = $request->input('longitude');
        
        if (!isset($lat) && !isset($long)) {
            $lat = '3.085';
            $long = '101.532';
        }
        
        $airQualityData = $this->airQualityService->getAirQuality($lat, $long);
        $airQualityData['uv_index'] = $this->airQualityService->getUvIndex($lat, $long);

        return $airQualityData;
    }
}
