import axios from 'axios'
import React, {useState,useEffect} from 'react'
import QueryField from './Components/QueryField'
import QueryResult from './Components/QueryResult'


const App = () =>{
  console.log("App")
  const [allCountryName,setAllCountryName] = useState([])
  const [countryName,setCountryName] = useState('')
  
  useEffect(()=>{ //will only execute the first time this component is rendered. To get all countries' data
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response =>{
        setAllCountryName(response.data)
      })
  },[])

  const handleCountryNameChange = (event) =>{ //the event handler for input field when value of the input field changes and when show button is pressed
    setCountryName(event.target.value)
  }


  let re = new RegExp(countryName,"i");
  const listResult = countryName === '' ? allCountryName : allCountryName.filter(allCountryName => (allCountryName.name).match(re))

  return (
    <div>
      <QueryField handleCountryNameChange={handleCountryNameChange} countryName = {countryName} />
      <QueryResult handleCountryNameChange={handleCountryNameChange} listResult={listResult}/>
    </div>
  )
}

export default App;
