import { createSlice } from '@reduxjs/toolkit';
import { updateProfile } from './actions';
import { State } from './types';

const initialState: State = {
  message: '',
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    resetState: state => {
      state.message = '';
      state.errors = undefined;
    },
  },
  extraReducers: builder => {
    builder.addCase(updateProfile.pending, state => {
      state.message = '';
      state.errors = undefined;
    });
    builder.addCase(updateProfile.fulfilled, (state, action) => {
      state.message = action.payload;
    });
    builder.addCase(updateProfile.rejected, (state, action) => {
      state.errors = action.payload?.errors;
    });
  },
});

export const profileActions = profileSlice.actions;

export default profileSlice.reducer;
