import { createSlice } from '@reduxjs/toolkit';

const orderSlice = createSlice({
  name: 'order',
  initialState: {
    orders: [],
    status: 'idle'
  },
  reducers: {
    placeOrder: (state, action) => {
      state.orders.push(action.payload);  
      state.status = 'placed';
    },
  },
});

export const { placeOrder } = orderSlice.actions;
export default orderSlice.reducer;
