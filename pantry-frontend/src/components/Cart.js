import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, clearCart } from "../redux/cartSlice";
import '../styles/Modal.css'; 

const Cart = ({ onClose }) => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  return (
    <div className="modal">
      <div className="modal-box">
        <h2>Your Cart</h2>
   
        <div style={{ maxHeight: '300px', overflowY: 'auto', marginBottom: '1rem' }}>
          {cartItems.length === 0 ? (
            <p>No items in cart</p>
          ) : (
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {cartItems.map((item) => (
                <li 
                  key={item.id} 
                  style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: '10px' }}
                >
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    style={{ width: "50px", height: "50px", objectFit: "cover" }} 
                  />
                  <span>{item.name}</span>
                  <button onClick={() => dispatch(removeFromCart(item.id))}>
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <button onClick={() => dispatch(clearCart())} style={{ marginRight: '10px', fontSize:'16px' }}>
          Clear Cart
        </button>
        <button onClick={onClose} style={{fontSize:'16px'}}>
          Close
        </button>
      </div>
    </div>
  );
};

export default Cart;
