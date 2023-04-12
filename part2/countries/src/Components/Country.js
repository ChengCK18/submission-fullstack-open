import React, { useState, useEffect } from "react";
import axios from "axios";
import * as dotenv from "dotenv";
dotenv.config();

const Country = ({ country, showSpecific, handleCountryNameChange }) => {
    const [weather, setWeather] = useState([]);

    useEffect(() => {
        if (showSpecific) {
            let api_key = process.env.REACT_APP_WEATHER_API_KEY;
            api_key = api_key.replaceAll("'", "");
            console.log(country.capital[0]);
            let url =
                "http://api.weatherstack.com/current?access_key=" +
                api_key +
                "&query=" +
                country.capital[0];
            url = url.replaceAll(" ", "");

            axios.get(url).then((response) => {
                setWeather(response.data.current);
            });
        }
    }, [showSpecific, country.capital]);

    if (showSpecific) {
        return (
            <div>
                <h2>{country.name.common}</h2>
                Capital is <b>{country.capital}</b>
                <br />
                Population of <b>{country.population}</b>
                <h3>Languages</h3>
                <ul>
                    {Object.entries(country.languages).map(
                        ([shortLang, lang]) => (
                            <li
                                key={country.name.common + "_lang_" + shortLang}
                            >
                                {lang}
                            </li>
                        )
                    )}
                </ul>
                <img
                    src={country.flags.png}
                    alt={country.flags.alt}
                    width="100"
                    height="100"
                />
                <h3>Weather in {country.capital}</h3>
                <b>Temperature:</b> {weather.temperature} <br />
                <img
                    src={weather.weather_icons}
                    width="100"
                    height="100"
                    alt="Weather Icon"
                />
                <br />
                <b>Wind:</b> {weather.wind_speed} mph direction{" "}
                {weather.wind_dir}
            </div>
        );
    } else {
        return (
            <div>
                {country.name.common}{" "}
                <button
                    onClick={handleCountryNameChange}
                    value={country.name.common}
                >
                    Show
                </button>
            </div>
        );
    }
};

export default Country;
