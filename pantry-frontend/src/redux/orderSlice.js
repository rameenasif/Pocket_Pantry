import { createSlice } from "@reduxjs/toolkit";

const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];

const orderSlice = createSlice({
  name: "orders",
  initialState: {
    orders: storedOrders, 
  },
  reducers: {
    placeOrder: (state, action) => {
      state.orders.push(action.payload);
      localStorage.setItem("orders", JSON.stringify(state.orders)); 
    },
    cancelOrder: (state, action) => {
      state.orders = state.orders.filter(order => order.id !== action.payload);
      localStorage.setItem("orders", JSON.stringify(state.orders)); 
    },
    clearOrders: (state) => {
      state.orders = [];
      localStorage.removeItem("orders"); 
    },
  },
});

export const { placeOrder, cancelOrder, clearOrders } = orderSlice.actions;
export default orderSlice.reducer;
