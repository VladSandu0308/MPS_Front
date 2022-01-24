import React, { useState, useEffect } from 'react';
import { useLocation, Navigate } from 'react-router-dom';

async function postRequest(credentials) {
  return fetch('http://localhost:3000/exitRoom', {
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

  const handleLeaveGame = async e => {
    
    e.preventDefault();
    console.log("Room name: " + state.user);
    const retBody = await postRequest({
      user_id: state.user,
      room_id: rooms?.room_id
    });

    console.log("Error:" + JSON.stringify(retBody));

    if (retBody.message.startsWith("The user has been successfully") ) {
      console.log("Error:" + JSON.stringify(retBody));
      setCreated(1); 

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
     },10000)
       
       
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
    return (
      <Navigate to="/"/>
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
            </div>            
          </div>
        </div>
        <div className='col-md-6 d-flex justify-content-center text-center'>
          <ul class="list-group" style={{width: "15rem"}}>
            <h5 class = "list-group-item-heading font-weight-bold">Players</h5>
            {
              
              rooms?.user_list?.map((user) => (
                <li class="list-group-item bg-dark text-white">{user.user_name}</li>
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

                <button type="button" class="btn btn-dark btn-lg">Start Game</button>
                <button type="button" class="btn btn-dark btn-lg">Setings</button>
                <button type="button" class="btn btn-dark btn-lg" onClick={handleLeaveGame}>Leave Game</button>
              </div>
            ) : (
              <button type="button" class="btn btn-dark btn-lg" onClick={handleLeaveGame}>Leave Game</button>
            )
            
          }
          
          
          
        </div>
      </div>
    </div>
    
  )
};

export default Room;