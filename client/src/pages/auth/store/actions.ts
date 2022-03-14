import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { LoginDto, RegisterDto, User } from './types';
import axios from '../../../config/axios.config';

type Rejected = {
  errors?: Partial<RegisterDto>;
  message?: string;
};

export const login = createAsyncThunk<
  string,
  LoginDto,
  { rejectValue: Rejected }
>('login', async (data, { rejectWithValue }) => {
  try {
    const rsp = await axios.post('/auth/login', data);

    return rsp.data.result.token;
  } catch (error) {
    return rejectWithValue((error as AxiosError).response?.data);
  }
});

export const register = createAsyncThunk<
  string,
  RegisterDto,
  { rejectValue: Rejected }
>('register', async (data, { rejectWithValue }) => {
  try {
    await axios.post('/auth/register', data);

    return 'Successful registration';
  } catch (error) {
    return rejectWithValue((error as AxiosError).response?.data);
  }
});

export const logout = createAsyncThunk('logout', async () => {
  await axios.post('/auth/logout');
});

export const getMe = createAsyncThunk<User>('me', async () => {
  const rsp = await axios.get('/auth/me');
  return rsp.data.result;
});
