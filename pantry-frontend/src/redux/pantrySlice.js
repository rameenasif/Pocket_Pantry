import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: JSON.parse(localStorage.getItem("pantryItems")) || [],
};

const pantrySlice = createSlice({
  name: "pantry",
  initialState,
  reducers: {
    addPantryItem: (state, action) => {
      state.items.push(action.payload);
      localStorage.setItem("pantryItems", JSON.stringify(state.items));
    },
    removePantryItem: (state, action) => {
      state.items = state.items.filter((_, index) => index !== action.payload);
      localStorage.setItem("pantryItems", JSON.stringify(state.items));
    },
  },
});   

export const { addPantryItem, removePantryItem } = pantrySlice.actions;
export default pantrySlice.reducer;
 
