import React from 'react';

const UserDashboard = () => {
  const handleViewCart = () => {
    alert("Redirect to Cart");
  };

  const handleViewGrocery = () => {
    alert("Redirect to Grocery List");
  };

  const handleViewRecipes = () => {
    alert("Redirect to Recipes");
  };

  return (
    <div style={{
      background: '#fff7e6',
      padding: '40px',
      borderRadius: '10px',
      maxWidth: '600px',
      margin: '50px auto',
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
    }}>
      <h2>Welcome, User!</h2>
      <p>Choose what you want to do:</p>

      <button onClick={handleViewCart} style={buttonStyle}>View Cart</button>
      <button onClick={handleViewGrocery} style={buttonStyle}>View Grocery List</button>
      <button onClick={handleViewRecipes} style={buttonStyle}>View Your Recipes</button>
    </div>
  );
};

const buttonStyle = {
  display: 'block',
  width: '100%',
  padding: '10px',
  margin: '10px 0',
  backgroundColor: '#28a745',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer'
};

export default UserDashboard;
