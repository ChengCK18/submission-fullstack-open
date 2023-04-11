import React,{useState,useEffect} from 'react'
import axios from 'axios'

const Country = ({country,showSpecific,handleCountryNameChange}) =>{
    console.log("Country")
    const [weather,setWeather] = useState([])
    
    useEffect( () =>{
      if(showSpecific){
        let api_key = process.env.REACT_APP_API_KEY
        api_key = api_key.replaceAll("'","")
        let url = "http://api.weatherstack.com/current?access_key=" + api_key + "&query=" + country.capital
        url = url.replaceAll(" ","")
        
        axios
        .get(url)
        .then(response =>{
          console.log(response.data.current)
          setWeather(response.data.current)
        })
  
      }
  
    },[showSpecific,country.capital])
  
    if(showSpecific){
      
      return(
        <div>
          <h2>{country.name}</h2>
          Capital is <b>{country.capital}</b><br/>
          Population of <b>{country.population}</b>
          <h3>Languages</h3>
          <ul >
            {country.languages.map((language,index) => <li key={country.name+"lang"+index}>{language.name}</li>)}
          </ul>
          <img src={country.flag} width="100" height="100" alt="Flag"/>
  
          <h3>Weather in {country.capital}</h3>
          <b>Temperature:</b> {weather.temperature} <br/>
          <img src={weather.weather_icons} width="100" height="100" alt="Weather Icon"/><br/>
          <b>Wind:</b> {weather.wind_speed} mph direction {weather.wind_dir}
  
        </div>
      )
    }
  
    else{
      return (
        <div>
            {country.name} <button onClick={handleCountryNameChange} value={country.name}>Show</button>
        </div>
      )
    }
  }


  export default Country