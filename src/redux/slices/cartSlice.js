import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartItems: [],
  },
 reducers: {

  addToCart: (state, action) => {
    const existingItem = state.cartItems.find(
      item => item.id === action.payload.id
    );

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      state.cartItems.push({
        ...action.payload,
        quantity: 1,
      });
    }
  },

  increaseQty: (state, action) => {
    const item = state.cartItems.find(
      i => i.id === action.payload
    );
    if (item) {
      item.quantity += 1;
    }
  },

  decreaseQty: (state, action) => {
    const item = state.cartItems.find(
      i => i.id === action.payload
    );
    if (item && item.quantity > 1) {
      item.quantity -= 1;
    }
  },

  removeFromCart: (state, action) => {
    state.cartItems = state.cartItems.filter(
      item => item.id !== action.payload
    );
  },

  clearCart: state => {
    state.cartItems = [];
  },
},

});

export const {   addToCart,
  removeFromCart,
  clearCart,
  increaseQty,
  decreaseQty, } =
  cartSlice.actions;

export default cartSlice.reducer;
