import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AddRecipe from './AddRecipeModal'; // Make sure this is the modal component
import './UserDashboard.css';

const UserDashboard = ({ setUser }) => {
  const navigate = useNavigate();
  const [showAddRecipe, setShowAddRecipe] = useState(false); 

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  };

  const handleRecipeAdded = () => {
    console.log("Recipe added successfully!");
  };

  return (
    <div className="dashboard-container">
      <div className="cards-section">

        <div className="welcome-section">
          <h2 style={{ fontSize: '35px', color: '#5e4a08ff' }}>
            Hello, Chef! Ready to Take Charge?
          </h2>
          <p style={{ fontSize: '20px' }}>
            <em>Your smart kitchen companion is ready to assist you.</em>
          </p>
        </div>

        <div className="dashboard-card">
          <h3>🛒 Cart</h3>
          <p>Your selected items are waiting!</p>
          <button onClick={() => alert("Redirect to Cart")}>View Cart</button>
        </div>

        <div className="dashboard-card">
          <h3>🥘 Recipes</h3>
          <p>Cook something new today!</p>
          <button onClick={() => setShowAddRecipe(true)}>Add Recipe</button>
          <button onClick={() => alert("Redirect to Your Recipes")}>View Your Recipes</button>
        </div>

        <div className="dashboard-card">
          <h3>🧂 Pantry Items</h3>
          <p>See what's in your pantry.</p>
          <button onClick={() => alert("Redirect to Pantry Items")}>View Pantry</button>
        </div>

        <div className="dashboard-card">
          <h3>📋 Grocery List</h3>
          <p>Don't forget your groceries!</p>
          <button onClick={() => alert("Redirect to Grocery List")}>View Grocery List</button>
        </div>

        <button className="logout-button" onClick={handleLogout}>Logout</button>

        {showAddRecipe && (
          <div className="add-recipe-form-section">
            <h3 style={{ marginTop: "30px", color: "#8A4F00" }}>Add a New Recipe</h3>
            <AddRecipe 
              onClose={() => setShowAddRecipe(false)} 
              onRecipeAdded={handleRecipeAdded}
            />
          </div>
        )}
      </div>

      <div className="image-section">
        <img src="/IMG_0453.jpeg" alt="Dashboard Picture" />
      </div>
    </div>
  );
};

export default UserDashboard;




