import { configureStore } from '@reduxjs/toolkit';
import productReducer from './slices/productSlice';
import cartReducer from './slices/cartSlice'
import userReducer from './slices/userSlice.js'
import categorySlice from './slices/categorySlice.js'
import orderReducer from "./slices/orderSlice.js";

export default configureStore({
  reducer: {
    products: productReducer,
    cart: cartReducer,
    user: userReducer,
     categories: categorySlice,
      orders: orderReducer,  
  },
});
