import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { apiRoutes } from "@config/apiRoutes";

interface FetchTasksParams {
    start?: string;
    end?: string;
    event_id?: number;
}

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
                return rejectWithValue(
                    error.response.data.detail || error.response.data
                );
            }
            return rejectWithValue(error.message);
        }
    }
);

export const fetchTaskDetails = createAsyncThunk(
    "task/fetchDetails",
    async (taskId: number, { rejectWithValue }) => {
        try {
            const accessToken = localStorage.getItem("access_token");

            if (!accessToken) {
                return rejectWithValue("Токен отсутствует");
            }
            const response = await axios.get(apiRoutes.task_detail(taskId), {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            return response.data;
        } catch (err) {
            const error = err as AxiosError<{ detail?: string }>;
            if (error.response) {
                return rejectWithValue(
                    error.response.data.detail || error.response.data
                );
            }
            return rejectWithValue(error.message);
        }
    }
);

export const addTask = createAsyncThunk<
    Task,
    {
        title: string;
        start_ts: string;
        end_ts: string;
        description?: string;
        priority?: "low" | "normal" | "high";
        type?: "homework" | "labwork" | "practicwork" | "general";
        event_id?: number | null;
        date?: string | null;
        for_group?: boolean;
        note?: string;
    },
    { rejectValue: string }
>("tasks/addTask", async (taskData, { rejectWithValue }) => {
    try {
        const accessToken = localStorage.getItem("access_token");
        const response = await axios.post<Task>(
            apiRoutes.tasks,
            {
                title: taskData.title,
                description: taskData.description || null,
                priority: taskData.priority || "normal",
                type: taskData.type || "general",
                event_id: taskData.event_id || null,
                date: taskData.date || null,
                start_ts: taskData.start_ts,
                end_ts: taskData.end_ts,
                for_group: taskData.for_group || false,
                note: taskData.note || "",
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );

        return response.data;
    } catch (err) {
        const error = err as AxiosError<{ detail?: string }>;
        if (error.response) {
            return rejectWithValue(
                error.response.data.detail ||
                    JSON.stringify(error.response.data)
            );
        }
        return rejectWithValue(
            "Произошла неизвестная ошибка при создании задачи"
        );
    }
});
