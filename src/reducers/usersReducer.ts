import { createSlice } from '@reduxjs/toolkit';

import { setGroup, resetSetGroupError, confirmUser, resetConfirmError, fetchUsers } from '../actions/userAction';

interface User {
    id: number;
    confirmed: boolean;
}

interface UsersGroupState {
    users: User[];
  loading: boolean;
  error: string | null;
}

const initialState: UsersGroupState = {
    users: [],
  loading: false,
  error: null,
};

const usersGroupSlice = createSlice({
  name: 'usersGroup',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(setGroup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(setGroup.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(setGroup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(resetSetGroupError, (state) => {
        state.error = null;
      })
      
      .addCase(confirmUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(confirmUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(confirmUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(resetConfirmError, (state) => {
        state.error = null;
      })
      
      
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default usersGroupSlice.reducer;
