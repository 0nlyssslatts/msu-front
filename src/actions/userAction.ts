import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { apiRoutes } from "@config/apiRoutes";
import axios, { AxiosError } from "axios";

// Async thunk for setting the group number of users
export const setGroup = createAsyncThunk(
  "users/setGroup",
  async (
    payload: { group_number: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(
        apiRoutes.setGroup,
        { group_number: payload.group_number },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      return response.data;
    } catch (err) {
      const error = err as AxiosError<{ detail?: string }>;
      if (error.response) {
        if (error.response.status === 404) {
          return rejectWithValue("Group not found");
        }
        return rejectWithValue(
          error.response.data.detail || error.response.data
        );
      }
      return rejectWithValue(error.message);
    }
  }
);

export const confirmUser = createAsyncThunk(
    "users/confirmUser",
    async (
      payload: { user_id: number },
      { rejectWithValue }
    ) => {
      try {
        const response = await axios.post(
          apiRoutes.confirmUser,
          { user_id: payload.user_id },
          { headers: { "Content-Type": "application/json" } }
        );
        return response.data;
      } catch (err) {
        const error = err as AxiosError<{ detail?: string }>;
        if (error.response) {
          if (error.response.status === 404) {
            return rejectWithValue("User not found");
          }
          return rejectWithValue(
            error.response.data.detail || error.response.data
          );
        }
        return rejectWithValue(error.message);
      }
    }
);

export const fetchUsers = createAsyncThunk(
    "users/fetchUsers",
    async (_, { rejectWithValue }) => {
      try {
        const token = localStorage.getItem("access_token");
        const response = await axios.get(apiRoutes.myGroup, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        return response.data;
      } catch (err) {
        const error = err as AxiosError<{ detail?: string }>;
        if (error.response) {
          return rejectWithValue(error.response.data.detail || "Ошибка загрузки");
        }
        return rejectWithValue(error.message);
      }
    }
  );
  
export const resetSetGroupError = createAction("users/resetSetGroupError");
export const resetConfirmError = createAction("users/resetConfirmError");

