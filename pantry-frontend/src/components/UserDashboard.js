import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AddRecipe from './AddRecipeModal';
import Cart from './Cart';
import AddPantryItemModal from './AddPantryItemModal'; 
import './UserDashboard.css';

const UserDashboard = ({ setUser }) => {
  const navigate = useNavigate();
  const [showAddRecipe, setShowAddRecipe] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showAddPantry, setShowAddPantry] = useState(false); 

  const cartItems = useSelector((state) => state.cart.items);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  };

  const handleRecipeAdded = () => {
    console.log("Recipe added successfully!");
  };

  const handlePantryItemAdded = () => {
    console.log("Pantry item added successfully!");
  };
  
  const handleOrderNow = () => {
    if (cartItems.length > 0) {
      navigate('/checkout'); 
    }
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
          <button onClick={() => setShowCart(true)}>View Cart</button>
          {cartItems.length > 0 && (
            <button style={{ marginTop: '10px' }} onClick={handleOrderNow}>
              Order Now
            </button>
          )}
        </div>

        <div className="dashboard-card">
          <h3>🥘 Recipes</h3>
          <p>Cook something new today!</p>
          <button onClick={() => setShowAddRecipe(true)}>Add Recipe</button>
          <button onClick={() => navigate('/recipes')}>View Your Recipes</button>
        </div>

        <div className="dashboard-card">
          <h3>🧂 Pantry Items</h3>
          <p>See what's in your pantry.</p>
          <button onClick={() => setShowAddPantry(true)}>Add Pantry Item</button> 
          <button onClick={() => navigate('/pantry')}>View Your Pantry</button>
        </div>

        <div className="dashboard-card">
          <h3>📋 Grocery List</h3>
          <p>Don't forget your groceries!</p>
          <button onClick={() => navigate('/grocery')}>View Grocery</button>
        </div>

        <div className="dashboard-card">
          <h3>📦 Orders</h3>
          <p>Track your orders!</p>
          <button onClick={() => navigate('/orders')}>View Orders</button>
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

        {showAddPantry && (
          <div className="add-recipe-form-section">
            <h3 style={{ marginTop: "30px", color: "#8A4F00" }}>Add a New Pantry Item</h3>
            <AddPantryItemModal
              onClose={() => setShowAddPantry(false)}
              onPantryItemAdded={handlePantryItemAdded}
            />
          </div>
        )}

        {showCart && <Cart onClose={() => setShowCart(false)} />}
      </div>

      <div className="image-section">
        <img src="/IMG_0453.jpeg" alt="Dashboard" />
      </div>
    </div>
  );
};

export default UserDashboard;













