import React from 'react'

const Persons = ({name,number,buttonId,handleDeleteContact}) =>{

    return (
        <div>
            {name} ➡ {number} <button id ={buttonId} onClick={handleDeleteContact}>delete</button> 
        </div>
     )
} 
  
export default Persons