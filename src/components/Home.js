import React from 'react'
import { Navigate, useLocation } from 'react-router-dom';

const Home = ({ token }) => {

  // const {state} = useLocation();
  // const {data} = state;
  // console.log("Data: " + JSON.stringify(state));

  return (
    <>
    {!token ? (
      <Navigate to="/login" state={{ test:"test" }} />
    ) : (
      
      <div className="container">
        
        <div className='row justify-content-around'>
          <div className='col-4'>
            <div className='card shadow' style={{position: 'fixed', width: '28rem', bottom: '15%'}}>
              <div className='card-header bg-secondary' style={{height: '4rem'}}>
              
              </div>
              <div className='card-body text-center bg-dark'>
                <a href="/newGame" className='stretched-link'></a>
                <h2 style={{color: 'gold'}}>Create new game</h2>
              </div>
              <div className='card-footer bg-secondary' style={{height: '4rem'}}></div>
            </div>
          </div>

          <div className='col-4'>
            <div className='card shadow' style={{position: 'fixed', width: '28rem', top: '15%'}}>
              <div className='card-header bg-secondary' style={{height: '4rem'}}></div>
              <div className='card-body text-center bg-dark'>
                <a href="/rooms" className='stretched-link'></a>
                <h2 style={{color: 'gold'}}>Join existing game</h2>
              </div>
              <div className='card-footer bg-secondary' style={{height: '4rem'}}></div>
            </div>
          </div>
        </div>
      </div>
    )}
    </>
    
  )
}

export default Home;