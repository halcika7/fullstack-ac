import { createSlice } from '@reduxjs/toolkit';
import { getMe, login, logout, register } from './actions';
import { State } from './types';

const initialState: State = {
  loading: true,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    resetValidationErrors: state => {
      state.errors = undefined;
      state.message = undefined;
    },
    resetAuth: state => {
      state.token = undefined;
      state.user = undefined;
    },
    updateUser: (state, action) => {
      if (state.user) {
        state.user.first_name = action.payload.first_name;
        state.user.last_name = action.payload.last_name;
        state.user.username = action.payload.username;
      }
    },
  },
  extraReducers: builder => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.token = action.payload;
    });
    builder.addCase(login.rejected || register.rejected, (state, action) => {
      state.errors = action.payload?.errors;
      if (!action.payload?.errors) {
        state.message = action.payload?.message;
      }
    });
    builder.addCase(logout.fulfilled, state => {
      state.user = undefined;
      state.token = undefined;
    });
    builder.addCase(register.fulfilled, (state, action) => {
      state.message = action.payload;
    });
    builder.addCase(getMe.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
    });
    builder.addCase(getMe.rejected, state => {
      state.loading = false;
    });
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
