import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import Logout from './components/Logout';

import useToken from './hooks/useToken';

import { Route, Routes, Navigate} from 'react-router-dom';
import React, { useState } from 'react';
import CreateNewGame from './components/CreateNewGame';
import useUser from './hooks/useUser';
import ExistingGames from './components/existingGames';
import Room from './components/Room';
import Game from './components/Game';


function App() {
  const { token, setToken } = useToken();
  const { user, setUser } = useUser();

  console.log("TEST" + token);


  return (
    <div className="App">
      
      <div className="container-fluid homepage-bgimage">
      { token ? (
        <div>
          <a href="/logout" class="btn btn-warning" style={{position: 'fixed', right: '1rem', 'top': '0.2rem', height: '2.3rem'}}>
            <p>Logout</p>
          </a>
          <a href="/" class="btn btn-warning" style={{position: 'fixed', left: '1rem', 'top': '0.2rem', height: '2.3rem'}}>
            <p>Go home</p>
          </a>
        </div>
      ) : (
        <></>
      )}
        <Routes>
          <Route path="/" element={<Home token={token}/>}/>
          <Route path="/logout" element = {<Logout setToken={setToken} token={token}/>}/>
          <Route path="/login" element = {<Login setToken={setToken} token={token} setUser={setUser}/>}/>
          <Route path="/register" element = {<Register/>}/>
          <Route path="/newGame" element = {<CreateNewGame token={token} user={user}/>}/>
          <Route path="/rooms" element = {<ExistingGames token={token} user={user}/>}/>
          <Route path="/rooms/:roomid" element = {<Room />}/>
          <Route path="/game/:roomid" element = {<Game />}/>
        </Routes>
        
        
      </div>
    </div>
  );
}

export default App;
