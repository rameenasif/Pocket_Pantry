import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, clearCart } from "../redux/cartSlice";
import "../styles/Modal.css";

const Cart = ({ onClose }) => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  return (
    <div className="modal">
      <div className="modal-box" style={{ padding: "20px", borderRadius: "10px", backgroundColor: "#fffaf0" }}>
        <h2 style={{ marginBottom: "15px", color: "#5e3a1c" }}>🛒 Your Cart</h2>

        <div
          style={{
            maxHeight: "300px",
            overflowY: "auto",
            paddingRight: "8px",
            marginBottom: "1rem",
            border: "1px solid #ddd",
            borderRadius: "8px",
            backgroundColor: "#fff8e7"
          }}
        >
          {cartItems.length === 0 ? (
            <p style={{ padding: "10px", textAlign: "center", color: "#666" }}>
              No items in cart
            </p>
          ) : (
            <ul style={{ listStyle: "none", padding: "10px", margin: 0 }}>
              {cartItems.map((item) => (
                <li
                  key={item.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "8px",
                    borderBottom: "1px solid #eee"
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{
                        width: "50px",
                        height: "50px",
                        objectFit: "cover",
                        borderRadius: "6px",
                        border: "1px solid #ccc"
                      }}
                    />
                    <span style={{ fontSize: "16px", fontWeight: "500", color: "#333" }}>
                      {item.name}
                    </span>
                  </div>
                  <button
                    onClick={() => dispatch(removeFromCart(item.id))}
                    style={{
                      background: "#ff6b6b",
                      border: "none",
                      padding: "6px 10px",
                      borderRadius: "6px",
                      color: "#fff",
                      cursor: "pointer"
                    }}
                  >
                    ✕
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
          <button
            onClick={() => dispatch(clearCart())}
            style={{
              background: "#c0392b",
              color: "#fff",
              padding: "8px 14px",
              borderRadius: "6px",
              border: "none",
              cursor: "pointer"
            }}
          >
            Clear Cart
          </button>
          <button
            onClick={onClose}
            style={{
              background: "#7f8c8d",
              color: "#fff",
              padding: "8px 14px",
              borderRadius: "6px",
              border: "none",
              cursor: "pointer"
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;

