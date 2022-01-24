import React, { useState, useEffect } from 'react';
import { Navigate } from "react-router-dom";
import PropTypes from 'prop-types';

async function loginUser(credentials) {
  return fetch('http://localhost:3000/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
 }

 async function enterGuest(credentials) {
  return fetch('http://localhost:3000/enterGuest', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
 }

const Login = ({ setToken, token, setUser }) => {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  console.log("1234 " + token);

  if(token) {
    return (
      <Navigate to="/" />
    );
  }
  

  const handleSubmit = async e => {
    e.preventDefault();
    const retBody = await loginUser({
      username,
      password
    });
    setToken(retBody.token);
    setUser(retBody.user_id);

  }

  const handleGuest = async e => {
    e.preventDefault();
    const retBody = await enterGuest({});
    setToken(retBody.token);
    setUser(retBody.user_id);
  }

    return (
      <div className='vertical'>

        <div className="card shadow mb-4 text-center" style={{ width: '22rem', maxHeight: '40rem', margin: '0 0', backgroundColor: 'gold' }}>
          <div className="card-body">
              <h4 className="card-title mb-0 border-bottom font-weight-bold"> Login</h4>
          </div>
                  
          <div className="card-body text-center">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label for="exampleInputEmail1">Username</label>
              <input type="text" className="form-control text-white bg-dark" placeholder="Enter username" onChange={e => setUserName(e.target.value)}/>
              
            </div>
            <div className="form-group">
              <label for="exampleInputPassword1">Password</label>
              <input type="password" className="form-control text-white bg-dark" id="exampleInputPassword1" placeholder="Password" onChange={e => setPassword(e.target.value)}/>
            </div>
            
            <button type="submit" className="btn btn-dark">Submit</button>
            
          </form>
          <h4 className='mt-2 mx-auto'>
            or
          </h4>
          <button type="submit" className="btn btn-dark" onClick={handleGuest}>Join as guest</button>
          

            
          </div>
          <div className="card-footer">
            <small className="text-muted">
                Don't have an account?
                <a className="ml-2" href="/register">
                    Register
                </a>
            </small>    
          </div>
        </div>
      </div>   
    );
  }

export default Login;