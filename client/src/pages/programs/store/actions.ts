import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import axios from '../../../config/axios.config';
import { Program, ProgramDto } from './types';

type Rejected = {
  errors?: Partial<ProgramDto>;
  message?: string;
};

export const getPrograms = createAsyncThunk<Program[]>('programs', async () => {
  const rsp = await axios.get('/program');

  return rsp.data.result;
});

export const deletePrograms = createAsyncThunk<string[], string[]>(
  'programs/program/delete',
  async ids => {
    await axios.delete(`/program`, { data: { ids } });

    return ids;
  }
);

export const createProgram = createAsyncThunk<
  string,
  ProgramDto,
  { rejectValue: Rejected }
>('programs/program/update', async (data, { rejectWithValue }) => {
  try {
    await axios.post('/program', data);
    return 'Program created';
  } catch (error) {
    return rejectWithValue((error as AxiosError).response?.data);
  }
});
