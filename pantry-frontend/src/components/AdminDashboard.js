import React from 'react';

const AdminDashboard = () => {
  const handleManagePantry = () => {
    alert("Redirect to Manage Pantry");
  };

  const handleViewOrders = () => {
    alert("Redirect to View All Orders");
  };

  const handleManageUsers = () => {
    alert("Redirect to Manage Users");
  };

  return (
    <div style={{
      background: '#f0f2f5',
      padding: '40px',
      borderRadius: '10px',
      maxWidth: '600px',
      margin: '50px auto',
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
    }}>
      <h2>Welcome, Admin!</h2>
      <p>Select:</p>

      <button onClick={handleManagePantry} style={buttonStyle}>Manage Pantry</button>
      <button onClick={handleViewOrders} style={buttonStyle}>View Orders</button>
      <button onClick={handleManageUsers} style={buttonStyle}>Manage Users</button>
    </div>
  );
};

const buttonStyle = {
  display: 'block',
  width: '100%',
  padding: '10px',
  margin: '10px 0',
  backgroundColor: '#007bff',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer'
};

export default AdminDashboard;
