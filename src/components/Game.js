import React, { useState } from 'react'
import { Navigate, useLocation } from 'react-router-dom';

const Game = ({room, user}) => {
  const[number, setNumber] = useState();

  const {state} = useLocation();

  console.log("SEEE" + room.number);

  const handleSubmit = async e => {
    
    e.preventDefault();
    console.log("Number: " + number);
    
  }

  return (
    <div className="card shadow mb-4 mx-auto" style={{top: '15rem', width: '32rem', backgroundColor: 'gold' }}>
      <div className='card-header bg-secondary' style={{height: '5rem'}}></div>
      <div className="card-body text-center">

          <h3 className="card-title border-bottom mb-2 font-weight-bold">Guess the number + {room.number}</h3>
          <div className="form-group mb-3">
            <input type="text" className="form-control bg-dark text-white" placeholder="Put number" onChange={e => setNumber(e.target.value)}/>
          </div>      
          <button type="button" className="btn btn-dark btn-lg font-weight-bold" onClick={handleSubmit} >Yes!</button>

      </div>
      <div className='card-footer bg-secondary' style={{height: '5rem'}}>
        {/* <button type="button" className="btn btn-dark btn-lg font-weight-bold" onClick={handleSubmit} >End Game</button> */}
        
      </div>  
  </div>
  )
}
export default Game
