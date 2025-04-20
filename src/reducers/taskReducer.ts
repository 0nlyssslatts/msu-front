import { createSlice } from "@reduxjs/toolkit";
import { fetchTasks } from "../actions/taskAction";

export interface Task {
  id: number;
  title: string;
  priority: "low" | "normal" | "high";
  type: "homework" | "labwork" | "practicwork" | "general";
  date: string | null;
  start_ts: string | null;
  end_ts: string | null;
}

interface TaskState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
}

const initialState: TaskState = {
  tasks: [],
  loading: false,
  error: null,
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default taskSlice.reducer;
