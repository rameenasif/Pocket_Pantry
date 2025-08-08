import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Modal.css";

const PantryItems = () => {
  const [pantryItems, setPantryItems] = useState([]);
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [editItemId, setEditItemId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editQuantity, setEditQuantity] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    fetchPantryItems();
  }, []);

  const fetchPantryItems = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/v1/pantry_items");
      setPantryItems(response.data);
    } catch (error) {
      console.error("Error fetching pantry items:", error);
    }
  };

  const handleAddPantryItem = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/api/v1/pantry_items", {
        pantry_item: {
          name: name,
          quantity: quantity
        }
      });
      setName("");
      setQuantity("");
      setShowModal(false);
      fetchPantryItems();
    } catch (error) {
      console.error("Error adding pantry item:", error);
    }
  };

  const startEditing = (item) => {
    setEditItemId(item.id);
    setEditName(item.name);
    setEditQuantity(item.quantity);
    setShowEditModal(true);
  };

  const handleUpdate = async (id) => {
    try {
      await axios.patch(`http://localhost:3000/api/v1/pantry_items/${id}`, {
        pantry_item: {
          name: editName,
          quantity: editQuantity
        }
      });
      setEditItemId(null);
      setEditName("");
      setEditQuantity("");
      setShowEditModal(false);
      fetchPantryItems();
    } catch (error) {
      console.error("Error updating pantry item:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/v1/pantry_items/${id}`);
      fetchPantryItems();
    } catch (error) {
      console.error("Error deleting pantry item:", error);
    }
  };

  return (
    <div>
      <h2>Your Pantry Items</h2>

      <button onClick={() => setShowModal(true)}>Add Item</button>

      {showModal && (
        <div className="modal">
          <div className="modal-box">
            <h3>Add Pantry Item</h3>
            <form onSubmit={handleAddPantryItem}>
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
              <button type="button" onClick={() => setShowModal(false)}>Cancel</button>
            </form>
          </div>
        </div>
      )}

      {showEditModal && (
        <div className="modal">
          <div className="modal-box">
            <h3>Edit Pantry Item</h3>
            <input
              type="text"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
            />
            <input
              type="text"
              value={editQuantity}
              onChange={(e) => setEditQuantity(e.target.value)}
            />
            <button onClick={() => handleUpdate(editItemId)}>Update</button>
            <button onClick={() => {
              setEditItemId(null);
              setShowEditModal(false);
            }}>Cancel</button>
          </div>
        </div>
      )}

      <ul>
        {pantryItems.map((item) => (
          <li key={item.id}>
            {item.name} — {item.quantity}
            <button onClick={() => startEditing(item)}>Edit</button>
            <button onClick={() => handleDelete(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PantryItems;


