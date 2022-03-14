import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import axios from '../../../config/axios.config';
import { RegisterDto } from '../../auth/store/types';
import { Profile } from './types';

type Rejected = {
  errors?: Partial<RegisterDto>;
  message?: string;
};

export const updateProfile = createAsyncThunk<
  string,
  Profile,
  { rejectValue: Rejected }
>('profile', async (data, { rejectWithValue }) => {
  try {
    await axios.patch('/profile', data);

    return 'Successful update';
  } catch (error) {
    return rejectWithValue((error as AxiosError).response?.data);
  }
});
