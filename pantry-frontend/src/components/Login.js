import React, { useState } from 'react';
import axios from 'axios';
import './Signup.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    try {
      const response = await axios.post('http://localhost:3000/login', {
        user: { email, password }
      });

      localStorage.setItem('token', response.headers.authorization);
      localStorage.setItem('user', JSON.stringify(response.data));
      alert('Login successful');
    } catch (error) {
      console.error('Login failed:', error.response?.data || error);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>Welcome Back to Pocket Pantry</h2>
      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Login</button>
    </form>
  );
}

export default Login;
