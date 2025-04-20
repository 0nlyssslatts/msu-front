import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { apiRoutes } from "@config/apiRoutes";

interface FetchTasksParams {
  start: string;
  end: string;
  event_id?: number;
}

export const fetchTasks = createAsyncThunk(
  "tasks/fetchTasks",
  async (params: FetchTasksParams, { rejectWithValue }) => {
    try {
      const accessToken = localStorage.getItem("access_token");
      const response = await axios.get(apiRoutes.tasks, {
        params,
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (err) {
      const error = err as AxiosError<{ detail?: string }>;
      if (error.response) {
        return rejectWithValue(error.response.data.detail || error.response.data);
      }
      return rejectWithValue(error.message);
    }
  }
);

export const fetchTaskDetails = createAsyncThunk(
  'task/fetchDetails',
  async (taskId: number, { rejectWithValue }) => {
    try {
      const response = await axios.get(apiRoutes.task_detail(taskId));
      return response.data;
    } catch (err) {
      const error = err as AxiosError<{ detail?: string }>;
      if (error.response) {
        return rejectWithValue(error.response.data.detail || error.response.data);
      }
      return rejectWithValue(error.message);
    }
  }
);
