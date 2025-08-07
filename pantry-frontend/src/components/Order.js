import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { placeOrder } from '../redux/orderSlice';

const Order = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const handlePlaceOrder = () => {
    const newOrder = {
      id: Date.now(),
      items: cartItems,
    };

    dispatch(placeOrder(newOrder));
    setTimeout(() => {
      console.log('Order sent to server:', newOrder);
    }, 1000);
  };

  return (
    <div>
      <button onClick={handlePlaceOrder}>Place Your Order</button>
    </div>
  );
};

export default Order;
