import React, { useState } from "react";
import axios from "axios";
import '../styles/Modal.css';

const AddRecipeModal = ({ onClose, onRecipeAdded }) => {
  const [instructions, setInstructions] = useState("");
  const [image, setImage] = useState(null);

  const handleAddRecipe = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("recipe[instructions]", instructions);
    formData.append("recipe[image]", image);

    try {
      await axios.post("http://localhost:3001/api/v1/recipes", formData);
      setInstructions("");
      setImage(null);
      onRecipeAdded();    
      onClose(); 
    } catch (error) {
      console.error("Error adding recipe:", error);
    }
  };

  return (
    <div className="modal">
      <div className="modal-box">
        <h3 style={{ fontSize: '26px' }}>Add Recipe</h3>
        <form onSubmit={handleAddRecipe}>
          <input
            type="text"
            placeholder="Enter recipe instructions"
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            required
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
          <button type="submit">Add</button>
          <button
            type="button"
            onClick={() => {
              console.log("Cancel clicked");
              onClose();
            }}
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddRecipeModal;
