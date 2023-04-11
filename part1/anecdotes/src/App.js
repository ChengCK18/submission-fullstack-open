
import React, { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blod tests when dianosing patients'
  ]
   
  
  const [selected, setSelected] = useState(0)
  const [votes,setVotes] = useState(new Array(anecdotes.length).fill(0))
  
  const orders =[
    {amount:250},
    {amount:300},
    {amount:100},
    {amount:21},
    {amount:500},
    {amount:25}
  ]
 
  let totalAmount = orders.reduce((sum,order)=>{
    console.log("Senor ", sum,order)
    return sum + order.amount
  },0)

  //0 zero is the initial value of the first parameter which is sum
  //order is each instance of amount when looping through the array


  console.log(totalAmount)

  const setToSelected = (new_val) =>{
    setSelected(new_val)
  }

  const setToVotes = (new_val) =>{
    const copy_votes = [...votes] //Must NOT mutate existing state directly
    copy_votes[selected]+=1 

    setVotes(copy_votes)
  }
  const max_vote_index = votes.indexOf(Math.max(...votes))

  return(
    <div>
      <Display title="Anecdote of the day" anecdotes= {anecdotes[selected]} votes={votes[selected]}/>
      <Button text="Vote" handleClick={() => setToVotes()}/>
      <Button text="Next Anecdotes" handleClick={() => setToSelected(Math.floor(Math.random() * anecdotes.length))}/>
      <Display title="Anecdote with most votes" anecdotes= {anecdotes[max_vote_index]} votes={votes[max_vote_index]}/>
    </div>
  )

}


const Button = ({text,handleClick}) =>{
  return (<button onClick={handleClick}>{text}</button>)
}

const Display  = ({mode,title,anecdotes,votes}) =>{
    return (
      <div>
        <h1>{title}</h1>
        {anecdotes} <br/>
        <b>has {votes} votes</b>
      </div>
    )
}




export default App;
