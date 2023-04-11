import React from 'react'
import Country from './Country'


const QueryResult = ({listResult,handleCountryNameChange}) => {
    console.log("QueryResult")
    let showSpecific = false
  
    if(listResult.length>10){
      showSpecific=false
      return (
        <>
          Too many matches, specify another filter
        </>
      )
    }
    else if (listResult.length>1){
      showSpecific=false
      return (
        <div>
            {listResult.map(country =><Country key={country.name} country={country} showSpecific={showSpecific} handleCountryNameChange={handleCountryNameChange}/>)}
        </div>
      )
    }
    else{
      if(typeof(listResult[0]) != 'undefined'){
        showSpecific=true
        return(
          <div>
            <Country key={listResult[0].name} country={listResult[0]} showSpecific={showSpecific} handleCountryNameChange={handleCountryNameChange}/>
          </div>
        )
      }
      else{
        return<></>
      }
    }
  }


  export default QueryResult