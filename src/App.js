import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import useToken from './hooks/useToken';

import { Route, Routes, Navigate} from 'react-router-dom';
import React, { useState } from 'react';


function App() {
  const { token, setToken } = useToken();

  console.log("TEST" + token);


  return (
    <div className="App">
      <div className="container-fluid homepage-bgimage">
        <div className='vertical'>
          <Routes>
            <Route path="/" element={<Home token={token}/>}/>
            <Route path="/login" element = {<Login setToken={setToken} token={token}/>}/>
            <Route path="/register" element = {<Register/>}/>
          </Routes>
        </div>
        
      </div>
    </div>
  );
}

export default App;
