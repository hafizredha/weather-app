<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class CityController extends Controller
{
    public function search(Request $request){
            $query = $request->input('query');

            try {
                $response = Http::get('https://geocoding-api.open-meteo.com/v1/search?', [
                    'name'  => $query,
                    'count' => '5',
                    'language'  => 'en',
                    'format' => 'json',
                ]);
                
                return $response->json();
            } catch (\Exception $th) {
                return 'AQI Api Error: '.$th->getMessage();
            }
    }
}
