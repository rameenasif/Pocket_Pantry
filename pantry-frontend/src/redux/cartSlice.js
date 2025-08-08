import { createSlice } from '@reduxjs/toolkit';

const loadCartFromStorage = () => {
  const savedCart = localStorage.getItem('cartState');
  return savedCart ? JSON.parse(savedCart) : [];
};

const initialState = {
  items: loadCartFromStorage(), 
  history: [], 
  lastAction: null, 
};

const cartSlice = createSlice({
  name: 'cart', 
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.history.push([...state.items]); 
      state.items.push(action.payload); 
      state.lastAction = { type: 'add', payload: action.payload }; 
      localStorage.setItem('cartState', JSON.stringify(state.items)); 
    },

    removeFromCart: (state, action) => {
      state.history.push([...state.items]); 
      state.items = state.items.filter(item => item.id !== action.payload); 
      state.lastAction = { type: 'remove', payload: action.payload }; 
      localStorage.setItem('cartState', JSON.stringify(state.items));
    },

    undoLastAction: (state) => {
      if (state.history.length > 0) {
        state.items = state.history.pop(); 
        localStorage.setItem('cartState', JSON.stringify(state.items));
      }
    },

    clearCart: (state) => {
      state.history.push([...state.items]); 
      state.items = []; 
      state.lastAction = { type: 'clear' };
      localStorage.setItem('cartState', JSON.stringify(state.items));
    }
  }
});

export const { addToCart, removeFromCart, undoLastAction, clearCart } = cartSlice.actions;
export default cartSlice.reducer;

