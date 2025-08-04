import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Modal.css";

const Recipe = () => {
  const [recipes, setRecipes] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [name, setName] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [editItemId, setEditItemId] = useState(null);
  const [editName, setEditName] = useState("");

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/v1/recipes");
      setRecipes(response.data);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  const handleAddRecipe = async (e) => {
    try {
      await axios.post("http://localhost:3000/api/v1/recipes", {
        recipe: { name }
      });
      setName("");
      setShowCreateModal(false);
      fetchRecipes();
    } catch (error) {
      console.error("Error adding recipe:", error);
    }
  };

  const startEditing = (item) => {
    setEditItemId(item.id);
    setEditName(item.name);
    setShowEditModal(true);
  };

  const handleUpdate = async (id) => {
    try {
      await axios.patch(`http://localhost:3000/api/v1/recipes/${id}`, {
        recipe: { name: editName }
      });
      setEditItemId(null);
      setEditName("");
      setShowEditModal(false);
      fetchRecipes();
    } catch (error) {
      console.error("Error updating recipe:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/v1/recipes/${id}`);
      fetchRecipes();
    } catch (error) {
      console.error("Error deleting recipe:", error);
    }
  };

  return (
    <div>
      <h2>Your Recipes</h2>

      <button onClick={() => setShowCreateModal(true)}>Add New Recipe</button>

      <ul>
        {recipes.map((item) => (
          <li key={item.id}>
            {item.name}
            <button onClick={() => startEditing(item)}>Edit</button>
            <button onClick={() => handleDelete(item.id)}>Delete</button>
          </li>
        ))}
      </ul>

      {showCreateModal && (
        <div className="modal">
          <div className="modal-box">
            <h3>Add Recipe</h3>
            <form onSubmit={handleAddRecipe}>
              <input
                type="text"
                placeholder="Enter recipe name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <button type="submit">Add</button>
              <button type="button" onClick={() => setShowCreateModal(false)}>Cancel</button>
            </form>
          </div>
        </div>
      )}

      {showEditModal && (
        <div className="modal">
          <div className="modal-box">
            <h3>Edit Recipe</h3>
            <input
              type="text"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
            />
            <button onClick={() => handleUpdate(editItemId)}>Update</button>
            <button onClick={() => setShowEditModal(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Recipe;

