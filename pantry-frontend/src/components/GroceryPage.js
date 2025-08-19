import React from "react";
import groceryItems from "./groceryData";
import './GroceryPage.css';

const GroceryPage = () => {
  return (
    <div className="grocery-page">
      <img
        src="/banner.jpg"
        alt="Grocery Banner"
        className="banner"
      />
      <h2 className="title" style={{color: '#5e4a08ff'}}>Stock up Without Stepping Out!</h2>
      <div className="grocery-grid">
        {groceryItems.map((item) => (
          <div key={item.id} className="grocery-card">
            <img src={item.image} alt={item.name} className="grocery-image" />
            <div className="grocery-info">
              <span className="grocery-name">{item.name}</span>
              <button className="buy-button">Buy</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GroceryPage;
