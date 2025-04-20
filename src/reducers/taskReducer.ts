import { createSlice } from "@reduxjs/toolkit";

import { fetchTasks, fetchTaskDetails, addTask } from "../actions/taskAction";

export interface Task {
    id: number;
    title: string;
    description: string | null;
    priority: "low" | "normal" | "high";
    type: "homework" | "labwork" | "practicwork" | "general";
    date: string | null; // формат ISO: '2025-04-20'
    start_ts: string | null; // ISO datetime: '2025-04-20T14:00:00'
    end_ts: string | null;
    completed: boolean;
    for_group: boolean;
    event_id: number | null;
}

interface TaskState {
    tasks: Task[];
    selectedTask: Task | null;
    loading: boolean;
    error: string | null;
}

const initialState: TaskState = {
    tasks: [],
    selectedTask: null,
    loading: false,
    error: null,
};

const taskSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {
        clearSelectedTask(state) {
            state.selectedTask = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // fetchTasks
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
            })

            // fetchTaskDetails
            .addCase(fetchTaskDetails.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.selectedTask = null;
            })
            .addCase(fetchTaskDetails.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedTask = action.payload;
            })
            .addCase(fetchTaskDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            .addCase(addTask.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addTask.fulfilled, (state, action) => {
                state.loading = false;
                state.tasks.push(action.payload);
            })
            .addCase(addTask.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { clearSelectedTask } = taskSlice.actions;
export default taskSlice.reducer;
