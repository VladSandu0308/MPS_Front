import React from 'react'
import { Navigate } from 'react-router-dom';

const Home = ({ token }) => {
  return (
    <>
    {!token ? (
      <Navigate to="/login" />
    ) : (
      <div className="container">
        <div className='row justify-content-around'>
          <div className='col-4'>
            <div className='card shadow' style={{width: '28rem', marginTop: '110%'}}>
              <div className='card-header bg-secondary' style={{height: '3rem'}}></div>
              <div className='card-body text-center bg-dark'>
                <a href="/newGame" className='stretched-link'></a>
                <h2 style={{color: 'gold'}}>Create new game</h2>
              </div>
              <div className='card-footer bg-secondary' style={{height: '3rem'}}></div>
            </div>
          </div>

          <div className='col-4'>
            <div className='card shadow' style={{width: '28rem', marginTop: '20%'}}>
              <div className='card-header bg-secondary' style={{height: '3rem'}}></div>
              <div className='card-body text-center bg-dark'>
                <a href="/newGame" className='stretched-link'></a>
                <h2 style={{color: 'gold'}}>Join existing game</h2>
              </div>
              <div className='card-footer bg-secondary' style={{height: '3rem'}}></div>
            </div>
          </div>
        </div>
      </div>
    )}
    </>
    
  )
}

export default Home;