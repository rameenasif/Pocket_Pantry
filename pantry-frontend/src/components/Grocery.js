import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Modal.css";

const Grocery = () => {
  const [groceryItems, setGroceryItems] = useState([]);
  const [name, setName] = useState("");
  const [editItemId, setEditItemId] = useState(null);
  const [editName, setEditName] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    fetchGroceryItems();
  }, []);

  const fetchGroceryItems = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/v1/groceries");
      setGroceryItems(response.data);
    } catch (error) {
      console.error("Error fetching groceries:", error);
    }
  };

  const handleAddGrocery = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/api/v1/groceries", {
        grocery_item: { name }
      });
      setName("");
      setShowCreateModal(false);
      fetchGroceryItems();
    } catch (error) {
      console.error("Error adding grocery:", error);
    }
  };

  const startEditing = (item) => {
    setEditItemId(item.id);
    setEditName(item.name);
    setShowEditModal(true);
  };

  const handleUpdate = async (id) => {
    try {
      await axios.patch(`http://localhost:3000/api/v1/groceries/${id}`, {
        grocery_item: { name: editName }
      });
      setEditItemId(null);
      setEditName("");
      setShowEditModal(false);
      fetchGroceryItems();
    } catch (error) {
      console.error("Error updating grocery:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/v1/groceries/${id}`);
      fetchGroceryItems();
    } catch (error) {
      console.error("Error deleting grocery:", error);
    }
  };

  return (
    <div>
      <h2>Grocery List</h2>

      <button onClick={() => setShowCreateModal(true)}>Add Grocery Item</button>

      {showCreateModal && (
        <div className="modal">
          <div className="modal-box">
            <h3>Add Grocery Item</h3>
            <form onSubmit={handleAddGrocery}>
              <input
                type="text"
                placeholder="Enter grocery item name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <button type="submit">Add</button>
              <button type="button" onClick={() => setShowCreateModal(false)}>
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}

      {showEditModal && (
        <div className="modal">
          <div className="modal-box">
            <h3>Edit Grocery Item</h3>
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

      <ul>
        {groceryItems.map((item) => (
          <li key={item.id}>
            {item.name}
            <button onClick={() => startEditing(item)}>Edit</button>
            <button onClick={() => handleDelete(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Grocery;
