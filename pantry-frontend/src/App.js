import React, { useState } from 'react';
import './App.css';
import Cart from './components/Cart'; 
import AdminDashboard from './components/AdminDashboard';
import UserDashboard from './components/UserDashboard';
import MainScreen from './components/Mainscreen'; 

function App() {
  const [darkmode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkmode);
  };

  const user = JSON.parse(localStorage.getItem('user'));

  const isAdmin = user?.role === true;

  return (
    <div className={`App ${darkmode ? 'dark' : ''}`}>
      <h1>Pocket Pantry</h1>
      {!user ? (
        <MainScreen />
      ) : isAdmin ? (
        <AdminDashboard />
      ) : (
        <UserDashboard />
      )}

      <button className="toggle-button" onClick={toggleDarkMode}>
        Toggle Mode: {darkmode ? 'Light' : 'Dark'}
      </button>
    </div>
  );
}

export default App;



