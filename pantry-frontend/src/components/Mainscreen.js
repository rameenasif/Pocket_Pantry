import React, { useState } from 'react';
import Signup from './Signup';
import Login from './Login'; 
import './Mainscreen.css';

const MainScreen = () => {
  const [showSignup, setShowSignup] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const backgroundStyle = {
    backgroundImage: "url('/IMG_0418.jpeg')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  return (
    <div style={backgroundStyle}>
      <div className="overlay-box">
        {!showSignup && !showLogin && (
          <>
            <h2>Hungry? Pocket Pantry is ready.</h2>
            <div className="line">
              <span style={{fontSize:'18px'}}><em>Returning to your pantry?</em></span>
              <button className="login-button" onClick={() => setShowLogin(true)}>Login</button>
            </div>
            <div className="line">
              <span style= {{fontSize: '18px'}}><em>First time here?</em></span>
              <button className="login-button" onClick={() => setShowSignup(true)}>Sign Up</button>
            </div>
          </>
        )}

        {showSignup && <Signup />}
        {showLogin && <Login />}
      </div>
    </div>
  );
};

export default MainScreen;




