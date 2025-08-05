import React, { useState } from 'react';
import axios from 'axios';
import './Signup.css';


function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async (e) => {
    try {
      const response = await axios.post('http://localhost:3000/signup', {
        user: { email, password }
      });

      localStorage.setItem('token', response.headers.authorization);
      localStorage.setItem('user', JSON.stringify(response.data));
      alert('Signup successful');
    } catch (error) {
      console.error('Signup failed:', error.response?.data || error);
    }
  };

  return (
    <form onSubmit={handleSignup}>
      <h2>Let’s Build Your Smart Pantry</h2>
      <input type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} required />
      <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} required />
      <button type="submit">Sign Up</button>
    </form>
  );
}

export default Signup;
