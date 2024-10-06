<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Vue.js Weather App</title>
</head>
<body>
    <div id="app">
        
    </div>

    <div id="hourly">

    </div>

    <div id="air">

    </div>

    <!-- Load compiled JavaScript -->
    @vite('resources/js/weather.js')
    @vite('resources/js/hourly-weather.js')
    @vite('resources/js/air-quality.js')
</body>
</html>
