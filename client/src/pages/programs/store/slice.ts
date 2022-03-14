import { createSlice } from '@reduxjs/toolkit';
import { getPrograms, deletePrograms, createProgram } from './actions';
import { State } from './types';

const initialState: State = {
  programs: [],
};

const programsSlice = createSlice({
  name: 'programs',
  initialState,
  reducers: {
    resetState: state => {
      state.errors = undefined;
      state.message = undefined;
    },
  },
  extraReducers: builder => {
    builder.addCase(getPrograms.fulfilled, (state, action) => {
      state.programs = action.payload;
    });
    builder.addCase(deletePrograms.fulfilled, (state, action) => {
      state.programs = state.programs.filter(
        program => !action.payload.includes(program._id)
      );
    });
    builder.addCase(createProgram.fulfilled, (state, action) => {
      state.message = action.payload;
    });
    builder.addCase(createProgram.rejected, (state, action) => {
      state.errors = action.payload?.errors;
    });
  },
});

export const programActions = programsSlice.actions;

export default programsSlice.reducer;
