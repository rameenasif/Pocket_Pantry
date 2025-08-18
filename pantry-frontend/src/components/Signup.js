import React, { useState } from 'react';
import axios from 'axios'; 
import './Signup.css';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [tenantId, setTenantId] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'http://localhost:3001/users', 
        {
          user: {
            email,
            password,
            password_confirmation: passwordConfirmation,
            tenant_id: tenantId
          }
        },
        {
          withCredentials: true,  
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          }
        }
      );

      const user = response.data.user;
      localStorage.setItem('user', JSON.stringify(user));

      alert('Signup successful');
      window.location.reload();
    } catch (error) {
      console.error('Signup failed:', error.response?.data || error);
      alert('Signup failed. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSignup}>
      <h2>Let's Build Your Smart Pantry</h2>

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

      <input
        type="password"
        placeholder="Confirm Password"
        onChange={(e) => setPasswordConfirmation(e.target.value)}
        required
      />

      <input
        type="text"
        placeholder="Tenant ID"
        onChange={(e) => setTenantId(e.target.value)}
        required
      />

      <button type="submit">Sign Up</button>
    </form>
  );
}

export default Signup;


