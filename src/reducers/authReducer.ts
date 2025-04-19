import { createSlice } from '@reduxjs/toolkit';

import {login, refresh, getCurrentUser, resetError } from '../actions/authActions';

interface User {
  id: number;
  group_id: number;
  confirmed: boolean;
  type: string
}

interface AuthState {
  accessToken: string | null;
  user: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  accessToken: null,
  user: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.accessToken = null;
      state.user = null;
      localStorage.removeItem('access_token');
    },
  },
  extraReducers: (builder) => {
    builder
      // Логин пользователя
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.accessToken = action.payload.access_token;
        localStorage.setItem('access_token', action.payload.access_token);
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Получение пользователя
      .addCase(getCurrentUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(getCurrentUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(resetError, (state) => {
        state.error = null;
      })

      // refresh
      .addCase(refresh.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(refresh.fulfilled, (state, action) => {
        state.loading = false;
        state.accessToken = action.payload.access_token;
        localStorage.setItem('access_token', action.payload.access_token);
      })
      .addCase(refresh.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
