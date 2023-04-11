import React from 'react'

// A Course component consist of a Header component, and a Content component
// A Content component contains many Part component

const Course = ({course}) =>{
    return (
    <div>
      <Header text = {course.name}/>
      <Content parts={course.parts}/>
    </div>)
  }
  
  const Header = ({text}) => <h1>{text}</h1>
  
  const Content = ({parts}) =>{
    const mapped_parts = parts.map((part)=>{
      return (<Part key={part.id} name={part.name} exercise={part.exercises}/>)
    })
  
    const total = parts.reduce((total,part) =>{
      return total+part.exercises
    },0)
  
  
    return(
    <div>
      {mapped_parts}
      <b>total of {total} exercises</b>
    </div>)
  }
  
  const Part = ({name,exercise}) => {
    return(
      <div>
        {name} {exercise}
      </div>
    )
  }


  export default Course