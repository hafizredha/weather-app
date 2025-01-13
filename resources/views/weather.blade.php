<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Vue.js Weather App</title>
</head>
<body>
    <div id="app" class="container">
        <div class="row justify-content-center gap-3">
            <div id="weather" class="frame-style col-lg-4">
                <weather></weather>
            </div>
            
            <div id="air" class="frame-style col-lg-7">
                <air-quality></air-quality>
            </div>
        </div>
    </div>

    <!-- Load compiled JavaScript -->
    @vite('resources/js/weather.js')
    <script src="https://kit.fontawesome.com/9c456af13d.js" crossorigin="anonymous"></script>
</body>
</html>
