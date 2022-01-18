import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';

async function postRequest(credentials) {
  return fetch('http://localhost:3000/createRoom', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
 }

const CreateNewGame = ({token, user}) => {

  const handleSubmit = async e => {
    e.preventDefault();
    const retBody = await postRequest({
      room_name: room,
      type,
      admin_id: user,
      password,
      max_users: players
    });

    console.log("Error:" + retBody.message);
  }

  const [type, setType] = useState("PUBLIC");
  const [password, setPassword] = useState();
  const [room, setRoom] = useState();
  const [players, setPlayers] = useState();

  if(!token) {
    return (
      <Navigate to="/login"/>
    )
  }

  return (
    <div className="card mb-2 mx-auto" style ={{backgroundColor: 'gold', width: '30rem', top: '13rem'}}>
      
      <div className='card-body text-center'>
        <h3 className='card-title border-bottom font-weight-bold' >Create new game</h3>
        <form onSubmit={handleSubmit}>
          <div className='form-group mb-3'>
            <label>Room Name</label>
            <input type="text" className='form-control text-white bg-dark' placeholder='Enter room name' onChange={e => setRoom(e.target.value)}></input>
          </div>
          <div className='form-group mb-3'>
            <label>Type</label>
            <select className='form-select text-white bg-dark' onChange={e => setType(e.target.value)}>
              <option selected value="PUBLIC">Public</option>
              <option value="PRIVATE">Private</option>
            </select>
          </div>
          { type === "PRIVATE" ? (
            <div className="form-group mb-3">
              <label>Password</label>
              <input type="password" className="form-control text-white bg-dark" placeholder="Password" onChange={e => setPassword(e.target.value)}/>
            </div>
          ) : (
            <></>
          )}
          <div className='form-group mb-3'>
            <label>Maximum number of players</label>
            <input type="text" className='form-control text-white bg-dark' placeholder='Enter players number' onChange={e => setPlayers(e.target.value)}></input>
          </div>
          <button type="submit" className="btn btn-dark">Create</button>
        </form>
      </div>
    </div>
  )
}

export default CreateNewGame
