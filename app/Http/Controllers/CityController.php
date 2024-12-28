<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class CityController extends Controller
{
    public function search(Request $request){
            $query = $request->input('query');
            $API_KEY  = env('WEATHER_API_TOKEN');

            try {
                $response = Http::get('http://api.openweathermap.org/geo/1.0/direct?', [
                    'q'     => $query,
                    'appid' => $API_KEY,
                ]);
                
                return $response->json();
            } catch (\Exception $th) {
                return 'AQI Api Error: '.$th->getMessage();
            }
    }
}
