import React from 'react'
import { Navigate } from 'react-router-dom';

const Logout = ({setToken, token}) => {
  console.log("Enter Logout");
  const handleSubmit = async e => {
    
    e.preventDefault();
    setToken(0);
    
  }

  if(!token) {
    return (
      <Navigate to="/login"/>
    )
  }

  return (
    <div className="card shadow mb-4 mx-auto" style={{top: '15rem', width: '32rem', backgroundColor: 'gold' }}>
      <div className='card-header bg-secondary' style={{height: '5rem'}}></div>
      <div className="card-body text-center">

          <h3 className="card-title border-bottom mb-2 font-weight-bold">Are you sure you want to logout?</h3>   
          <button type="button" className="btn btn-dark btn-lg font-weight-bold" onClick={handleSubmit} >Yes!</button>

      </div>
      <div className='card-footer bg-secondary' style={{height: '5rem'}}></div>  
  </div>
  )
}
export default Logout
