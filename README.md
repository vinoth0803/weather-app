# Weather App

## Description

A beginner-friendly weather app built with React JS and OpenWeatherMap API. The app helps users stay updated on current weather conditions. The app allows users to search for a city's current weather, displaying temperature, humidity, wind speed, and weather icons. It features a clean and attractive user interface, making it ideal for those learning API integration with React.

## Features

* Search for weather by city name
* Display temperature, humidity, and wind speed
* Weather icons based on weather conditions
* Error handling for invalid city names
* Preloads weather data for Chennai on initial load
* User-friendly and responsive design

## Technologies Used

* React JS
* OpenWeatherMap API
* CSS for styling

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/weather-app.git
   ```
2. Navigate to the project directory:

   ```bash
   cd weather-app
   ```
3. Install dependencies:

   ```bash
   npm install
   ```
4. Add a .env file in the root directory and include your OpenWeatherMap API key:

   ```bash
   VITE_APP_ID=your_api_key
   ```

## Usage

1. Start the development server:

   ```bash
   npm start
   ```
2. Open your browser and visit:

   ```
   http://localhost:5173
   ```

   (Note: The server typically runs on localhost:5173, but it may vary depending on your environment.)
3. Enter a city name in the search bar to get the current weather.

## Project Structure

```
src
├── assets         # Weather icons
├── components     # React components
├── App.js       # Main application file
└── Weather.jsx     # Weather component
```

## License

This project is licensed under the MIT License.

## Acknowledgments

* OpenWeatherMap for the API
* React JS for the frontend framework
* Thanks to all contributors and the developer community for their support and inspiration

## Contact

For any questions or suggestions, please reach out via GitHub issues.
