import React from 'react'
import { Navigate } from 'react-router-dom';

const Home = ({ token }) => {
  return (
    <>
    {!token ? (
      <Navigate to="/login" />
    ) : (
      <div>
        <h1>TEST</h1>
      </div>
    )}
    </>
    
  )
}

export default Home;