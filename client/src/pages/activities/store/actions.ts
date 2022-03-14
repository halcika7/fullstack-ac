import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../config/axios.config';
import { Activity, State } from './types';

export const getActivities = createAsyncThunk<
  Activity[],
  void,
  { state: { activities: State } }
>('activities', async (_, { getState }) => {
  const id = getState().activities.last_seen;
  const query = id ? `?id=${id}` : '';

  const rsp = await axios.get(`/activities${query}`);

  return rsp.data.result;
});
