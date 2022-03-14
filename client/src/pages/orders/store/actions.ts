import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../config/axios.config';
import { CreateOrder, Order, State } from './types';

export const getOrders = createAsyncThunk<
  Order[],
  void,
  { state: { orders: State } }
>('orders', async (_, { getState }) => {
  const id = getState().orders.last_seen;
  const query = id ? `?id=${id}` : '';

  const rsp = await axios.get(`/orders${query}`);

  return rsp.data.result;
});

export const makeOrder = createAsyncThunk<string, CreateOrder>(
  'orders/make',
  async data => {
    await axios.post('/orders', data);

    return 'Order created';
  }
);
