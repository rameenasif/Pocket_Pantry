import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addPantryItem } from "../redux/pantrySlice";
import "../styles/Modal.css";

const AddPantryItemModal = ({ onClose, onPantryItemAdded }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !quantity.trim()) return;

    dispatch(addPantryItem({ id: Date.now(), name, quantity }));
    setName("");
    setQuantity("");
    if (onPantryItemAdded) onPantryItemAdded();
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-box">
        <h3>Add Pantry Item</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Pantry Item Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />
          <button type="submit">Add</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default AddPantryItemModal;
