import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { placeOrder } from '../redux/orderSlice';
import { clearCart } from '../redux/cartSlice';
import { useNavigate } from 'react-router-dom';

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
      alert('Order successfully placed!');
      navigate('/orders');         
    } else {
      alert('Order has already been placed!');
    }
  };

  return (
    <div style={{ padding: '20px', backgroundColor: '#f5f0e1', minHeight: '100vh' }}>
      <h2>Checkout</h2>
      <div style={{ marginBottom: '20px' }}>
        {cartItems.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <ul>
            {cartItems.map(item => (
              <li key={item.id}>{item.name}</li>
            ))}
          </ul>
        )}
      </div>
      <button onClick={handleSubmit} style={{ padding: '10px 20px' }}>
        Submit Order
      </button>
    </div>
  );
};

export default Checkout;


