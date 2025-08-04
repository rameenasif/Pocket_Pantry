import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, clearCart } from '../redux/cartSlice';

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  return (
    <div>
      <h2>Cart</h2>
      {cartItems.length === 0 ? (
        <p>No items in cart</p>
      ) : (
        <>
          {cartItems.map(item => (
            <div key={item.id}>
              {item.name} — Qty: {item.quantity}
              <button onClick={() => dispatch(removeFromCart(item.id))}>Remove</button>
            </div>
          ))}
          <button onClick={() => dispatch(clearCart())}>Clear Cart</button>
        </>
      )}
    </div>
  );
};

export default Cart;
