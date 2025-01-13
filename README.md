# Weather Web App 🌦️

A dynamic and responsive weather web application built with a modern tech stack. This app provides real-time weather data and air quality insights using the **Open-Meteo API** and **WAQI API**, paired with dynamic visuals and a clean, intuitive UI.

## Features 🚀

- **Real-Time Weather Data**: Displays temperature, precipitation, humidity, and more.
- **Air Quality Insights**: Monitors air quality levels using WAQI data.
- **Dynamic Backgrounds**: Background changes based on the current weather.
- **Interactive Charts**: Visualize weather trends with tools like ApexCharts.
- **Search Suggestions**: Auto-complete functionality powered by the Open-Meteo Geocoding API.
- **Responsive Design**: Built with Bootstrap for compatibility across devices.
- **State Management**: Pinia ensures efficient handling of application state.
- **Modern Development Workflow**: Developed with Vue.js, Laravel, Vite, and Docker for seamless integration and deployment.

## Tech Stack 🛠️

- **Frontend**: HTML5, Vue.js, Bootstrap, Pinia
- **Backend**: Laravel (PHP)
- **Asset Compilation**: Vite
- **Containerization**: Docker
- **Web Server**: nginx
- **Package Management**: NPM
- **APIs**: 
  - [Open-Meteo API](https://open-meteo.com/)
  - [WAQI API](https://waqi.info/)

## Installation 🛠️

Follow these steps to set up and run the application locally:

### Prerequisites

- [Docker](https://www.docker.com/)
- [Node.js & NPM](https://nodejs.org/)
- [Composer](https://getcomposer.org/)

### Steps

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/weather-web-app.git
   cd weather-web-app

2. Install Dependencies:

    Backend:

       composer install

    Frontend:

        npm install

3. Set Up Environment Variables: Copy .env.example to .env and configure your API keys for Open-Meteo and WAQI:

        OPEN_METEO_API_KEY=your_open_meteo_key
        WAQI_API_KEY=your_waqi_key

4. Build Assets:

        npm run build

5. Start Docker Containers:

        docker-compose up

6. Access the App: Visit http://localhost in your browser.

### Usage 📖

    Search for a location using the search bar to view weather and air quality data.
    Navigate through the app to explore different visualizations and insights.

### Screenshots 🖼️

![Weather Web](https://cdn.dribbble.com/userupload/18386050/file/original-d6743b08a2caaca08ccad4d3619b8279.png?resize=1440x1024&vertical=center)

### Contributing 🤝

Contributions are welcome! Please fork the repository and submit a pull request for any changes or improvements.

### License 📜

This project is licensed under the MIT License. See the LICENSE file for details.


You can copy and paste this code into your `README.md` file on GitHub.
