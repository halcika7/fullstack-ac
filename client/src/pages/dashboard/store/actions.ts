import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../config/axios.config';
import { FacilityStat, OrdersByMonth } from './types';

export const ordersByMonth = createAsyncThunk<OrdersByMonth[]>(
  'ordersByMonth',
  async () => {
    const rsp = await axios.get('/orders/by-month');

    return rsp.data.result;
  }
);

export const getFacilityStats = createAsyncThunk<FacilityStat>(
  'facilityStat',
  async () => {
    const rsp = await axios.get('/facility-stats');

    return rsp.data.result;
  }
);
