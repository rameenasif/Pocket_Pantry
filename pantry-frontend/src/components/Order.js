import React from "react";
import { useSelector } from "react-redux";
import "./Order.css";

const Orders = () => {
  const orders = useSelector((state) => state.order.orders);

  return (
    <div className="orders-page">
      <div className="orders-left">
        <h2 className="orders-heading">Your Culinary Adventures</h2>
        <div className="orders-cards-container">
          {orders.length === 0 ? (
            <p className="no-orders">No orders placed yet.</p>
          ) : (
            [...orders].reverse().map((order, index) => (
              <div key={order.id} className="order-card">
                <h3>Order {orders.length - index}</h3>
                <ul>
                  {order.items.map((item) => (
                    <li key={item.id}>
                      <img src={item.image} alt={item.name} />
                      <span>{item.name}</span>
                    </li>
                  ))}
                </ul>
                <div className="order-buttons">
                  <button className="update-btn">Update Order</button>
                  <button className="cancel-btn">Cancel Order</button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="orders-right">
        <img
          src="/IMG_1179.jpeg"
          alt="Orders visual"
          className="orders-image"
        />
      </div>
    </div>
  );
};

export default Orders;






