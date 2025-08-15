import React, { useEffect, useState } from "react";
import axios from "axios";
import "./UserRecipes.css"; 

const UserRecipes = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/v1/recipes", {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      console.log("Fetched Recipes:", response.data);
      setRecipes(response.data.data);
    } catch (error) {
      console.error(
        "Error fetching recipes:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <div className="user-recipes-container">
      {recipes.length > 0 && <h2>Your Recipes</h2>} 
      <div className="recipe-cards">
        {recipes.length === 0 ? (
          <div className="no-recipes-container">
            <img
              src="IMG_1174.jpeg"
              alt="No Recipes"
              className="no-recipes-image"
            />
            <p className="no-recipes-text">
              NO recipes found — start by adding one.
            </p>
          </div>
        ) : (
          recipes.map((recipe) => (
            <div key={recipe.id} className="recipe-card">
              <img
                src={recipe.attributes.image_url}
                alt="Recipe"
                className="recipe-image"
              />
              <p>{recipe.attributes.instructions}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default UserRecipes;






