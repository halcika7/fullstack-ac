import { createSlice } from '@reduxjs/toolkit';
import { getFacilityStats, ordersByMonth } from './actions';
import { State } from './types';

const initialState: State = {
  orders: [],
  stat: {
    money_discount: 0,
    money_earned: 0,
    number_of_customers: 0,
    number_of_given_discounts: 0,
  },
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(ordersByMonth.fulfilled, (state, action) => {
      state.orders = action.payload;
    });
    builder.addCase(getFacilityStats.fulfilled, (state, action) => {
      state.stat = action.payload;
    });
  },
});

export const dashboardActions = dashboardSlice.actions;

export default dashboardSlice.reducer;
