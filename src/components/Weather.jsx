import React from 'react'
import { useEffect, useState, useRef} from 'react'
import './Weather.css'
import searchIcon from '../assets/search.png'
import clearIcon from '../assets/clear.png'
import drizzleIcon from '../assets/drizzle.png'
import humidityIcon from '../assets/humidity.png'
import rainIcon from '../assets/rain.png'
import snowIcon from '../assets/snow.png'
import windIcon from '../assets/wind.png'
import cloudIcon from '../assets/cloud.png'

const Weather = () => {
    const inputRef = useRef()
    const [weatherData, setWeatherData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const allIcons = {
        "01d": clearIcon,
        "01n": clearIcon,
        "02d": cloudIcon,
        "02n": cloudIcon,
        "03d": drizzleIcon,
        "03n": drizzleIcon,
        "04d": cloudIcon,
        "04n": cloudIcon,
        "09d": rainIcon,
        "09n": rainIcon,
        "10d": rainIcon,
        "10n": rainIcon,
        "13d": snowIcon,
        "13n": snowIcon,
    }

    const search = async (city) => {
        if(!city || city.trim() === '') {
            setError("Please enter a city name")
            return;
        }
        
        setLoading(true)
        setError(null)
        
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`
            const response = await fetch(url)
            const data = await response.json()
            
            if(data.cod !== 200) {
                throw new Error(data.message || "City not found")
            }
            
            const icon = allIcons[data.weather[0].icon] || clearIcon
            setWeatherData({
                humidity: data.main.humidity,
                wind: data.wind.speed,
                temp: Math.floor(data.main.temp),
                location: data.name,
                icon: icon
            })
        } catch (error) {
            setError(error.message || "Error fetching weather data")
            setWeatherData(null)
            console.error("Error fetching weather data:", error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        search("Chennai")
    }, [])

    return (
        <div className='weather'>
            <div className="search-bar">
                <input 
                    type="text" 
                    placeholder="Search for a city..." 
                    ref={inputRef}
                    onKeyPress={(e) => e.key === 'Enter' && search(inputRef.current.value)}
                />
                <img 
                    src={searchIcon} 
                    alt="search" 
                    onClick={() => search(inputRef.current.value)} 
                />
            </div>

            {loading && <div className="loading">Loading...</div>}
            
            {error && <div className="error">{error}</div>}
            
            {weatherData && (
                <>
                    <img src={weatherData.icon} alt="weather icon" className='weather-icon' />
                    <p className='temperature'>{weatherData.temp}°C</p>
                    <p className='location'>{weatherData.location}</p>
                    <div className="weather-data">
                        <div className="col">
                            <img src={humidityIcon} alt="humidity" />
                            <div>
                                <p>{weatherData.humidity}%</p>
                                <span>Humidity</span>
                            </div>
                        </div>
                        <div className="col">
                            <img src={windIcon} alt="wind" />
                            <div>
                                <p>{weatherData.wind} km/h</p>
                                <span>Wind speed</span>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}

export default Weather