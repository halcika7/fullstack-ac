import { createSlice } from '@reduxjs/toolkit';
import { getActivities } from './actions';
import { State } from './types';

const initialState: State = {
  activities: [],
  last_seen: undefined,
  hasMore: false,
};

const activitiesSlice = createSlice({
  name: 'activities',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getActivities.fulfilled, (state, action) => {
      const len = action.payload.length;
      state.activities = action.payload;
      if (len) {
        state.hasMore = true;
        state.last_seen = action.payload[len - 1]._id;
      }
    });
  },
});

export default activitiesSlice.reducer;
