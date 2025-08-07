import React, { useEffect, useState } from "react";
import axios from "axios";


const UserRecipes = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/v1/recipes");
      setRecipes(response.data.data); 
    } catch (error) {
      console.error("Error fetching recipes", error);
    }
  };

  return (
    <div className="user-recipes-container">
      <h2>Your Recipes</h2>
      <div className="recipe-cards">
        {recipes.map((recipe) => (
          <div key={recipe.id} className="recipe-card">
            <img
              src={recipe.attributes.image_url}
              alt="Recipe"
              className="recipe-image"
            />
            <p>{recipe.attributes.instructions}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserRecipes;
