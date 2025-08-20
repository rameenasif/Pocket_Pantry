// src/components/Checkout.js
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { placeOrder } from "../redux/orderSlice";
import { clearCart } from "../redux/cartSlice";
import { useNavigate } from "react-router-dom";
import "./Checkout.css";

const Checkout = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const orders = useSelector((state) => state.order.orders); 
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [orderPlaced, setOrderPlaced] = useState(false);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    const alreadyPlaced = orders.some(
      (order) =>
        order.items.length === cartItems.length &&
        order.items.every((item, index) => item.id === cartItems[index].id)
    );
    setOrderPlaced(alreadyPlaced);
  }, [cartItems, orders]);

  const handleSubmit = () => {
    if (cartItems.length === 0) return;

    if (!orderPlaced) {
      const newOrder = {
        id: Date.now(),
        items: cartItems,
        details: {
          name,
          address,
          phone,
        },
      };

      dispatch(placeOrder(newOrder));
      dispatch(clearCart());
      setOrderPlaced(true);
      alert("Order successfully placed!");
      navigate("/orders"); 
    } else {
      alert("Order has already been placed!");
    }
  };

  return (
    <div className="checkout-page">
      <img
        src="IMG_1214.jpeg"
        alt="Checkout Photo"
        className="checkout-photo"
      />

      <div className="checkout-box">
        <h2 className="checkout-heading">Checkout</h2>

        <div className="checkout-content">
          <form
            className="checkout-form"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />

            <button type="submit" className="checkout-button">
              Submit Order
            </button>
          </form>

          <div className="checkout-cart">
            <h3>Your Cart</h3>
            {cartItems.length === 0 ? (
              <p>Your cart is empty</p>
            ) : (
              <ul>
                {cartItems.map((item) => (
                  <li key={item.id}>{item.name}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;







