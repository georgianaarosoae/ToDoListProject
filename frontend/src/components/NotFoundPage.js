import React from 'react';
import './css/NotFoundPage.css';
import notFoundGif from './../media/404.gif';

const NotFoundPage = ({ onUserTypeChange }) => {
  return (
    <div className="not-found-page">
      <h2>404: Page Not Found</h2>
      <img src={notFoundGif} alt="404 Gif" />
      <button onClick={() => { onUserTypeChange('home'); }}>Return Home</button>
    </div>
  );
};

export default NotFoundPage;