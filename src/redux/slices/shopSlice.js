import { createSlice } from "@reduxjs/toolkit";

const getLocalStorage = (key) => {
  if (typeof window !== "undefined") {
    return localStorage.getItem(key);
  }
  return null;
};

const setLocalStorage = (key, value) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, value);
  }
};

const initialState = {
  cart: [],
};

export const shopSlice = createSlice({
  name: "shop",
  initialState,
  reducers: {
    setCart: (state, action) => {
      if (!state.cart) {
        state.cart = [];
      }
      state.cart.push(action.payload);
      setLocalStorage("cart", JSON.stringify(state.cart));
    },
    prepareCart: (state) => {
      const cart = getLocalStorage("cart");
      if (cart) {
        state.cart = JSON.parse(cart);
      } else {
        state.cart = [];
      }
    },
    removeFromCart: (state, action) => {
      if (!state.cart) {
        state.cart = [];
        return;
      }
      const index = state.cart.findIndex(
        (item) => item.title === action.payload.title
      );
      if (index !== -1) {
        state.cart.splice(index, 1);
        setLocalStorage("cart", JSON.stringify(state.cart));
      }
    },
  },
});

export const { setCart, removeFromCart, prepareCart } = shopSlice.actions;

export default shopSlice.reducer;
