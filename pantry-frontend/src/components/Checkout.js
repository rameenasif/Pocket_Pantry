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
          <form className="checkout-form" onSubmit={(e) => e.preventDefault()}>
            <input type="text" placeholder="Full Name" required />
            <input type="text" placeholder="Address" required />
            <input type="text" placeholder="Phone" required />

            <button onClick={handleSubmit} className="checkout-button">
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



