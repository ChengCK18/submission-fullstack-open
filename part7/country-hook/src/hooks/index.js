import { useState, useEffect } from "react"
import axios from 'axios'

export const useCountry = (name) => {
    const [country, setCountry] = useState(null)

    useEffect(() => {
        if (name !== '') {
            axios.get(`https://restcountries.com/v3.1/name/${name}`)
                .then((res) => {
                    console.log(res.data[0])
                    setCountry(res.data[0])
                })
                .catch((err) => {
                    setCountry(null)
                })
        }

    }, [name])

    return country
}