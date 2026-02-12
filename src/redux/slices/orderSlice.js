import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orders: [],  
};

const orderSlice = createSlice({
  name: "orders",
  initialState,

  reducers: {


    addOrder: (state, action) => {
      state.orders.unshift(action.payload);
    },

    updateOrderStatus: (state, action) => {
      const { orderId, status } = action.payload;

      const order = state.orders.find(
        item => item.id === orderId
      );

      if (order) {
        order.status = status;
      }
    },

   
    clearOrders: (state) => {
      state.orders = [];
    }
  },
});

export const {
  addOrder,
  updateOrderStatus,
  clearOrders
} = orderSlice.actions;

export default orderSlice.reducer;
