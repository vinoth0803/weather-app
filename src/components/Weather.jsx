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
    const [weatherData, setWeatherData] = useState(false);
    // const [weather, setWeather] = useState(null)
    // const [city, setCity] = useState('London')

    const allIcons = {
        "01d": clearIcon,
        "01n": clearIcon,
        "02d": cloudIcon,
        "02n": cloudIcon,
        "03d": cloudIcon,
        "03n": cloudIcon,
        "04d": drizzleIcon,
        "04n": drizzleIcon,
        "09d": rainIcon,
        "09n": rainIcon,
        "10d": rainIcon,
        "10n": rainIcon,
        "13d": snowIcon,
        "13n": snowIcon,
    }
    const search = async (city) => {
        if(!city) {
            alert("Please enter a city name")
            return;
        }
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`
            const response = await fetch(url)
            const data = await response.json()
            if(data.cod !== 200) {
                alert("City not found")
                return;
            }
            console.log(data.cod)
            console.log(data)
            const icon = allIcons[data.weather[0].icon] || clearIcon
            setWeatherData({
                humidity: data.main.humidity,
                wind: data.wind.speed,
                temp: Math.floor(data.main.temp),
                location: data.name,
                icon: icon
            })


        }catch (error) {
            setWeatherData(false)
            console.error("error fetching weather data", error)
        }
    }

    useEffect(() => {
        search("Chennai")
    }, [])


  return (
    <div className='weather'>
      <div className="search-bar">
        <input type="text" placeholder="Search for a city..." ref={inputRef}/>
        <img src={searchIcon} alt="searchIcon" onClick={()=>search(inputRef.current.value)} />
      </div>
      {weatherData?<>  
        <img src={weatherData.icon} alt="" className='weather-icon' />
      <p className='temperature'>{weatherData.temp}°C</p>
      <p className='location'>{weatherData.location}</p>
      <div className="weather-data">
        <div className="col">
            <img src={humidityIcon} alt="" />
            <div>
                <p>{weatherData.humidity} %</p>
                <span>Humidity</span>
            </div>
        </div>
        <div className="col">
            <img src={windIcon} alt="" />
            <div>
                <p>{weatherData.wind} Km/hr</p>
                <span>Wind speed</span>
            </div>
        </div>
      </div>
      </>:<>
        
      
      
       </>}
      
    </div>
  )
}

export default Weather
