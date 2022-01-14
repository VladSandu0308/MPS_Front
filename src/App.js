import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Login from './components/Login';
import Register from './components/Register';

import { Route, Routes } from 'react-router-dom';



function App() {
  return (
    <div className="App">
      <div className="container-fluid homepage-bgimage">
        <div className='vertical'>
          <Routes>
            <Route path="/" element = {<Login />}/>
            <Route path="/register" element = {<Register/>}/>
          </Routes>
        </div>
        
      </div>
    </div>
  );
}

export default App;
