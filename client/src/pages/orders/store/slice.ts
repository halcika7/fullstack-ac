import { createSlice } from '@reduxjs/toolkit';
import { getOrders, makeOrder } from './actions';
import { State } from './types';

const initialState: State = {
  orders: [],
  last_seen: undefined,
  hasMore: false,
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    resetMessage: state => {
      state.message = undefined;
    },
  },
  extraReducers: builder => {
    builder.addCase(getOrders.fulfilled, (state, action) => {
      const len = action.payload.length;
      state.orders = action.payload;
      if (len) {
        state.hasMore = true;
        state.last_seen = action.payload[len - 1]._id;
      }
    });
    builder.addCase(makeOrder.fulfilled, (state, action) => {
      state.message = action.payload;
    });
  },
});

export const orderActions = ordersSlice.actions;

export default ordersSlice.reducer;
