import React, { useState, useEffect } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { format } from 'react-string-format';

import Game from '../components/Game';

async function postRequest(credentials) {
  return fetch('http://localhost:3000/exitRoom', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => {
      data.json()
    })
 }

 async function postEndGame(credentials) {
  return fetch('http://localhost:3000/endGame', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
 }

 async function postStartRequest(credentials) {
  return fetch('http://localhost:3000/startGame', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
 }



const Room = () => {

  const {state} = useLocation();

  console.log("STATE: " + JSON.stringify(state));

  const [rooms, setRooms] = useState({});
  const [loaded, setLoaded] = useState(0);
  const [ fetchingUser, setFetchingUser ] = useState(true);

  const [created, setCreated] = useState(0);
  const [start, setStart] = useState(0);
  const [number, setNumber] = useState();

  const [status, setStatus] = useState("");

  const handleDeletePlayer = async (user_id) => {
    const retBody = await postRequest({
      user_id: user_id,
      room_id: rooms?.room_id
    });
  }

  const handleLeaveGame = async e => {
    
    e.preventDefault();
    console.log("Room name: " + state.user);
    const retBody = await postRequest({
      user_id: state.user,
      room_id: rooms?.room_id
    });

    console.log("Error:" + JSON.stringify(retBody));

    setCreated(1); 
  }

  const endGame = async e => {
    e.preventDefault();

    setStatus("");

    const retBody = await postEndGame({
      admin_id: rooms?.admin_id,
      room_id: rooms?.room_id,
      user_id: state.user
    });

    console.log("Error:" + JSON.stringify(retBody));

    if (retBody.message.startsWith("The game has ended") ) {
      console.log("Error:" + JSON.stringify(retBody));
    }
  }

  const checkNumber = async e => {
    e.preventDefault();
    console.log(rooms?.number);
    if (rooms?.number < number) {
      setStatus(<p className="alert alert-warning">Too high, guess again</p>);
      setNumber(0);
    } else if (rooms?.number > number) {
      setStatus(<p className="alert alert-warning">Too low, guess again</p>);
      setNumber(0);
    } else {
      setStatus(<p className="alert alert-success">Correct!</p>);
      setNumber(0);
      endGame(e);
    }
  }

  const handleStartGame = async e => {
    
    e.preventDefault();
    const retBody = await postStartRequest({
      admin_id: rooms?.admin_id,
      room_id: rooms?.room_id
    });

    console.log("Error:" + JSON.stringify(retBody));

    if (retBody.message.startsWith("The game has started") ) {
      console.log("Error:" + JSON.stringify(retBody));
    }
  }

  useEffect(() => {
    setLoaded(0);
    let isMounted = true;
    const fetchData = async () => {
      try {
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ room_id: state.room_id })
        };


        const response = await fetch('http://localhost:3000/getRoom', requestOptions);
        const result = await response.json();
        console.log("Result:" + JSON.stringify(result));
        setRooms(result);
        if (!Object.values(result?.user_list).some(a => a.user_id === state.user) && result?.viewers_nr === 0) {
          setCreated(1);
        } 
        console.log("Good Result: " + JSON.stringify(result));
        setFetchingUser(false);
        
      } catch (e) {
        console.log(e);
      }
    }

    fetchData();
    setLoaded(1);
    console.log(rooms);

    const interval=setInterval(()=>{
      fetchData()
     },3000)
       
       
     return() => {
       clearInterval(interval);
       setRooms({});
     }
  }, [])

  if (loaded === 0) {
    return (
      <></>
    )
  }

  
  
  if (created) {
    if (state.token === 123456789) {
      return (
        <Navigate to="/logout"/>
      )
    }

    return (
      <Navigate to="/"/>
    )
  }

  if (rooms?.message?.startsWith("No rooms")) {
    if (state.token === 123456789) {
      return (
        <Navigate to="/logout"/>
      )
    }
    return (
      <Navigate to="/"/>
    )
  }

  if (rooms?.game_status === "In progress") {
    
    return (
      // <Navigate to={format('/game/{0}', rooms?.room_id)} state={{ "room_id":rooms?.room_id, "user": state.user, "number": rooms?.number, "admin_id": rooms?.admin_id }}/>
      // <Game room={rooms} user={state.user} />
      <div className="card shadow mb-4 mx-auto" style={{top: '15rem', width: '32rem', backgroundColor: 'gold' }}>
        <div className='card-header bg-secondary' style={{height: '5rem'}}></div>
        <div className="card-body text-center">

            <h3 className="card-title border-bottom mb-2 font-weight-bold">Guess the number</h3>
            <div className="form-group mb-3">
              <input type="text" className="form-control bg-dark text-white" placeholder="Put number" onChange={e => setNumber(e.target.value)}/>
            </div>      
            <button type="button" className="btn btn-dark btn-lg font-weight-bold" onClick={checkNumber} >Try</button>
            {status}
        </div>
        <div className='card-footer bg-secondary' style={{height: '5rem'}}>
          <button type="button" className="btn btn-dark btn-lg font-weight-bold" onClick={endGame} >End Game</button>
          
        </div>  
      </div>
    )
  }

  return (
    <div className="card mb-2 mx-auto" style ={{backgroundColor: 'gold', width: '40rem', top: '13rem'}}>
      <h3 class="card-title border-bottom border-dark font-weight-bold" style ={{marginBottom:'20px'}}> Room: {rooms.room_name} </h3>
      <div className='row mb-4 g-3'>
        <div className='col-md-6 d-flex justify-content-center'>
          <div className='card mx-auto bg-dark text-white'>
            <div className='card-body mx-auto'>
              <h5>Number of players in room </h5>
              <p>{rooms?.user_list?.length}</p>
              <h5>Maximum no. of players</h5>
              <p>{rooms?.max_players}</p>
              <h5>Number of viewers in room</h5>
              <p>{rooms?.viewers_nr}</p>
              <h5>Viewers Points</h5>
              {
                rooms?.viewers_pts === null ? (
                  <p>0</p>
                ) : (
                  <p>{rooms?.viewers_pts}</p>
                )
              }
              
            </div>            
          </div>
        </div>
        <div className='col-md-6 d-flex justify-content-center text-center'>
          <ul class="list-group" style={{width: "15rem"}}>
            <h5 class = "list-group-item-heading font-weight-bold">Players</h5>
            {
              
              rooms?.user_list?.sort((a, b) => {return b.user_score - a.user_score}).map((user) => (
                <li class="list-group-item bg-dark text-white">
                  {
                    state.user === rooms?.admin_id ? (
                      <button type="button" class="close" aria-label="Close" onClick={() => handleDeletePlayer(user.user_id)}>
                        <span aria-hidden="true">&times;</span>
                      </button>
                    ) : (
                      <></>
                    )
                    
                  }
                  
                  {user.user_name} --- {user.user_score}
                </li>
              ))
            }
          </ul>
        </div>
      </div>

      <div className='row g-3 mb-4'>
        <div className='col-md-12'>

          {
            state.user === rooms?.admin_id ? (
              <div className='col-md-12 d-flex justify-content-center gap-3'>

                <button type="button" class="btn btn-dark btn-lg" onClick={handleStartGame}>Start Game</button>
                <button type="button" class="btn btn-dark btn-lg" onClick={handleLeaveGame}>Leave Room</button>
              </div>
            ) : (
              <button type="button" class="btn btn-dark btn-lg" onClick={handleLeaveGame}>Leave Room</button>
            )
            
          }
          
          
          
        </div>
      </div>
    </div>
    
  )
};

export default Room;