import React, { useState } from 'react';
import './css/LoginPopup.css';
import axios from 'axios';
//import bcrypt from 'bcrypt'
import { useNavigate } from 'react-router-dom';

const LoginPopup = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleLoginSuccess = () => {
    setIsLoggedIn(true); 
    navigate('/ToDoList'); 
  };
  const handleLogin = () => {
  axios.post('http://localhost:9000/api/login', { email, password })
    .then((response) => {
      const token = response.data.token; 
      localStorage.setItem('token', token); 
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`; 
      handleLoginSuccess(); 
    })
    .catch((error) => {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log('Error', error.message);
      }
      console.log(error.config);
    });
  };
  

  return (
    <div className="login-popup">
      <div className="popup-content">
        <label>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <button onClick={handleLogin}>Login</button>
        <p className='pLoginPopup' onClick={onClose}>Cancel</p>
      </div>
    </div>
  );
};

export default LoginPopup;
