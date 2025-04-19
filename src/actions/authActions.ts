import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { apiRoutes } from '@config/apiRoutes';
import axios from 'axios';

export const login = createAsyncThunk(
    'auth/login',
    async (userData: { token: string }, { rejectWithValue }) => {
      try {
        const response = await axios.post(apiRoutes.login, userData, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        return response.data;
      } catch (error) {
        if (error.response && error.response.data) {
          return rejectWithValue(error.response.data.detail || error.response.data);
        }
        return rejectWithValue(error.message);
      }
    },
);

export const refresh = createAsyncThunk('auth/refresh', async (_, { rejectWithValue }) => {
    try {
      const response = await axios.post(apiRoutes.refresh, null, { withCredentials: true });
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data.detail || error.response.data);
      }
      return rejectWithValue(error.message);
    }
});


export const getCurrentUser = createAsyncThunk('auth/getCurrentUser', async (_, { rejectWithValue }) => {
    try {
      const accessToken = localStorage.getItem('access_token');
  
      if (!accessToken) {
        return rejectWithValue('Токен отсутствует');
      }
  
      const response = await axios.get(apiRoutes.curentUser, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data.detail || error.response.data);
      }
      return rejectWithValue(error.message);
    }
});

export const resetError = createAction('auth/resetError');

  
  