import React, { useState } from 'react';
import axios from 'axios';
import './Signup.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [tenantId, setTenantId] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log('Login clicked');

    try {
      const response = await axios.post(
        'http://localhost:3001/users/sign_in',
        {
          user: {
            email,
            password,
            tenant_id: tenantId,
          }
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          withCredentials: true
        }
      );

      const user = response.data.user;
      const token = response.headers['authorization'];

      if (token) {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        alert('Login successful!');
        window.location.href = '/userdashboard';
      } else {
        alert('Login failed. No token received.');
      }
    } catch (error) {
      console.error('Login error:', error.response?.data || error);
      alert('Login failed. Check console for details.');
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>Login</h2>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
      />

      <input
        type="text"
        placeholder="Tenant ID"
        value={tenantId}
        onChange={e => setTenantId(e.target.value)}
        required
      />

      <button type="submit">Login</button>
    </form>
  );
}

export default Login;




