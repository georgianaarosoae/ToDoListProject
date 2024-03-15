import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import teamTrackerImage from './../media/todoList.jpg';
import LoginPopup from './LoginPopup.js';
import SignUpPopup from './SignUpPopUp.js';
import './css/HomePage.css';

const HomePage = () => {
  const [loginPopupVisible, setLoginPopupVisible] = useState(false);
  const [signUpPopupVisible, setSignUpPopupVisible] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const toggleLoginPopup = () => {
    setLoginPopupVisible(!loginPopupVisible);
  };

  const toggleSignUpPopup = () => {
    setSignUpPopupVisible(!signUpPopupVisible);
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    navigate('/ToDoList');
  };

  const handleSignUpSuccess = () => {
    setIsLoggedIn(true);
    navigate('/ToDoList');
  };

  const handleRedirect = () => {
    navigate('./ToDoList');
  };

  return (
    <div className="home-page">
      <img src={teamTrackerImage} alt="TeamTracker" className="home-image" />
      <div className="home-content">
        <p className="description">
          Task tracking web application that helps teams stay organized and efficient.
        </p>
        <button className="login-button" onClick={toggleLoginPopup}>Login</button>
        <button className="signup-button" onClick={toggleSignUpPopup}>SignUp</button>
        {isLoggedIn ? (
          <p onClick={handleRedirect}>UserPage</p>
        ) : null}
      </div>
      {loginPopupVisible && <LoginPopup onClose={toggleLoginPopup} onLoginSuccess={handleLoginSuccess} />}
      {signUpPopupVisible && <SignUpPopup onClose={toggleSignUpPopup} onSignUpSuccess={handleSignUpSuccess} />}
    </div>
  );
};

export default HomePage;
