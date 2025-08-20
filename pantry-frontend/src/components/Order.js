import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { cancelOrder } from "../redux/orderSlice"; 
import api from "../utils/axiosHelper"; 
import "./Order.css";

const Orders = () => {
  const orders = useSelector((state) => state.order.orders); 
  const dispatch = useDispatch();

  const handleCancel = async (id) => {
    try {
      await api.delete(`/orders/${id}`);
      dispatch(cancelOrder(id));
    } catch (error) {
      console.error("Failed to cancel order:", error);
      alert("Something went wrong while canceling your order.");
    }
  };

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

                {order.details && (
                  <div className="order-details">
                    <p><strong>Name:</strong> {order.details.name}</p>
                    <p><strong>Address:</strong> {order.details.address}</p>
                    <p><strong>Phone:</strong> {order.details.phone}</p>
                  </div>
                )}

                <ul>
                  {order.items.map((item) => (
                    <li key={item.id}>
                      {item.image && (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="order-item-img"
                        />
                      )}
                      <span>{item.name}</span>
                    </li>
                  ))}
                </ul>

                <div className="order-buttons">
                  <button className="update-btn">Update Order</button>
                  <button
                    className="cancel-btn"
                    onClick={() => handleCancel(order.id)}
                  >
                    Cancel Order
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="orders-right">
        <img
          src="/IMG_1179.jpeg"
          alt="Orders photo"
          className="orders-image"
        />
      </div>
    </div>
  );
};

export default Orders;











