import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import Login from './Login'

async function register(credentials) {
  return fetch('http://localhost:3000/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
 }

const Register = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [username, setUsername] = useState();
  const [token, setToken] = useState(0);

  const handleSubmit = async e => {
    e.preventDefault();
    console.log(username);
    const retBody = await register({
      username,
      email,
      password
    });

    setToken(retBody);

  }
  return (
      
    <>
    {token != 0 ? (
      <Navigate to="/login"/>
    ) : (
      <div className="card shadow mb-4 text-center" style={{ width: '22rem', maxHeight: '40rem', margin: '0 0', backgroundColor: 'gold' }}>
        <div className="card-body">
            <h4 className="card-title mb-0 border-bottom font-weight-bold"> Register</h4>
        </div>
                
        <div className="card-body text-center">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label for="exampleInputEmail1">Username</label>
            <input type="text" className="form-control" placeholder="Enter username" onChange={e => setUsername(e.target.value)}/>
            
          </div>
          <div className="form-group">
            <label for="exampleInputEmail1">Email</label>
            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" onChange={e => setEmail(e.target.value)}/>
            
          </div>
          <div className="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" onChange={e => setPassword(e.target.value)}/>
          </div>
          
          <button type="submit" className="btn btn-dark">Submit</button>
        </form>

          
        </div>
        <div className="card-footer">
          <small className="text-muted">
              Already have an account?
              <a className="ml-2" href="/login">
                  Sign In
              </a>
          </small>    
        </div>
      </div>
    )}
      
    </>
    
  );
}
    export default Register;