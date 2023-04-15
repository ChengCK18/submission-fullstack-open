import React from 'react'

const PersonForm = ({onSubmit,newNameVal,newName,newNumberVal,newNum}) =>{
    return(
      <div>
         <form onSubmit={onSubmit}>
          <div>Name: <input onChange={newNameVal} value ={newName}/></div>
          <div>Number: <input onChange={newNumberVal} value ={newNum}/></div>
  
          <div><button type="submit">add</button></div>
  
        </form>
      </div>
    )
}

export default PersonForm