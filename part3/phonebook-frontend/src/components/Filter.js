import React from 'react'

const Filter = ({newSearchNameVal,newSearchName}) =>{
    return (<div>Filter shown with <input onChange={newSearchNameVal} value ={newSearchName}/></div>)
}

export default Filter;