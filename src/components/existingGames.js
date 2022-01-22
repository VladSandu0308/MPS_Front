import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import {format} from 'react-string-format'

async function postRequest(credentials) {
  return fetch('http://localhost:3000/chooseRoom', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
 }

const ExistingGames = ({token, user}) => {

  const [rooms, setRooms] = useState([]);
  const [loaded, setLoaded] = useState(0);
  const [ fetchingUser, setFetchingUser ] = useState(true);

  const [password, setPassword] = useState();
  const [created, setCreated] = useState(0);

  const handleJoinGame = async (room_name, type) => {
    
    console.log("Room name: " + user);
    const retBody = await postRequest({
      room_name,
      type,
      user_id: user,
      password
    });

    console.log("Error:" + JSON.stringify(retBody));

    if (retBody.message.startsWith("The user has been successfully") ) {
      console.log("Error:" + JSON.stringify(retBody));
      setCreated(retBody.room_id); 

    }

  console.log("cccc" + created);


  }

  useEffect(() => {
    setLoaded(0);
    let isMounted = true;
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/getRoomDetails');
        
        if (fetchingUser) {
          const result = await response.json();
          console.log("Result:" + JSON.stringify(result));
          const arr = Object.values(result);
          console.log("Array:" + arr);
          setRooms(result);
        }
        setFetchingUser(false);
        
      } catch (e) {
        console.log(e);
      }
    }

    fetchData();
    setLoaded(1);
    console.log(rooms);

    return () => { isMounted = false };
  }, [])

  if (loaded === 0) {
    return (
      <></>
    )
  }

  if(!token) {
    return (
      <Navigate to="/login"/>
    )
  }

  if (created) {
    return (
      <Navigate to={format('/rooms/{0}', created)} state={{ "room_id":created, user }}/>
    )
  }

  return (    
    <div className="card mb-2 mx-auto" style ={{backgroundColor: 'gold', width: '30rem', top: '5rem'}}>
      <div className='card-body text-center'>
        <h3 className='card-title border-bottom font-weight-bold' >Rooms</h3>
        <div className = "accordion accordion-flush" id = "accordionFlushExample">
          {
            rooms.map((item) => (
              <div className='accordion-item'>
                <h2 class="accordion-header" id="flush-headingOne">
                <button class="accordion-button collapsed bg-dark text-white" type="button" data-toggle="collapse" data-target={format('#{0}', item.room_id)} aria-expanded="false" aria-controls="flush-collapseOne">
                    
                    <div className='col-md-6'>
                      {item.room_name}
                    </div>
                  
                    {
                      item.type === "PRIVATE" ? (
                        <div className='col-md-2 offset-md-4'>
                          <i class="bi bi-lock" style={{height: '16', width: '16'}}></i>
                        </div>
                      ) : (
                        <div className='col-md-2 offset-md-4'>
                          <i class="bi bi-globe" style={{height: '32', width: '32'}}></i>
                        </div>
                      )
                    }
                    
                  
                  
                </button>
                <div id={item.room_id} class="accordion-collapse collapse bg-dark text-white" aria-labelledby="flush-headingOne" data-parent="#accordionFlushExample">
                  <div className='accordion-body'>
                    { item.type === "PRIVATE" ? (
                      <div className="form-group mb-3">
                        <label>Password</label>
                        <input type="password" className="form-control text-white bg-dark" placeholder="Password" onChange={e => setPassword(e.target.value)}/>
                      </div>
                    ) : (
                      <></>
                    )}
                    <button type="button" className="btn btn-warning btn-lg font-weight-bold" onClick={() => handleJoinGame(item.room_name, item.type)} >Join Room</button>
                  </div>
                </div>
                </h2>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default ExistingGames
