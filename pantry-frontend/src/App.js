import React, { useState, useEffect } from 'react';

import AdminDashboard from './components/AdminDashboard';
import UserDashboard from './components/UserDashboard';
import MainScreen from './components/Mainscreen';
import UserRecipes from './components/UserRecipes';
import Grocery from './components/GroceryPage';
import Cart from './components/Cart';

import { Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [darkmode, setDarkMode] = useState(false);
  const [user, setUser] = useState(null);

  const toggleDarkMode = () => {
    setDarkMode(!darkmode);
  };


  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    setUser(storedUser);
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      setUser(storedUser);
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const isAdmin = user?.role === true || user?.role === 'admin'; 

  return (
    <div className={`App ${darkmode ? 'dark' : ''}`}>
      <h1>Pocket Pantry</h1>

      <Routes>
        {!user && <Route path="*" element={<MainScreen setUser={setUser} />} />}

        {user && isAdmin && (
          <Route path="*" element={<AdminDashboard setUser={setUser} />} />
        )}

        {user && !isAdmin && (
          <>
            <Route path="/dashboard" element={<UserDashboard setUser={setUser} />} />
            <Route path="/recipes" element={<UserRecipes />} />
            <Route path="/grocery" element={<Grocery />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="*" element={<Navigate to="/dashboard" />} />
          </>
        )}
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <button className="toggle-button" onClick={toggleDarkMode}>
        Toggle Mode: {darkmode ? 'Light' : 'Dark'}
      </button>
    </div>
  );
}

export default App;








