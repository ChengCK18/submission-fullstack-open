import React from 'react'


const QueryField = ({handleCountryNameChange,countryName}) => {
    console.log("QueryField")
    return(
      <div>
        Find Countries <input onChange={handleCountryNameChange} value={countryName}></input>
      </div>
    )
}


export default QueryField
  