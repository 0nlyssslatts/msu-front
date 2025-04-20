import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiRoutes } from "@config/apiRoutes";
import axios, { AxiosError } from "axios";

type TaskType = "homework" | "labwork" | "practicwork" | "general";
type PriorityType = "low" | "normal" | "high";

export interface Task {
    id: number;
    title: string;
    priority: PriorityType;
    type: TaskType;
    date: string | null;
    start_ts: string | null;
    end_ts: string | null;
}

export const getTasks = createAsyncThunk<
    Task[],
    { title: string; start: string; end: string; event_id?: number },
    { rejectValue: string }
>("tasks/getTasks", async (params, { rejectWithValue }) => {
    try {
        const response = await axios.get<Task[]>(apiRoutes.tasks, {
            params: {
                start_date: params.start,
                end_date: params.end,
                ...(params.event_id && { event_id: params.event_id }),
            },
        });
        return response.data;
    } catch (err) {
        const error = err as AxiosError<{ detail?: string }>;
        if (error.response) {
            return rejectWithValue(
                error.response.data.detail ||
                    JSON.stringify(error.response.data)
            );
        }
        return rejectWithValue("Произошла неизвестная ошибка");
    }
});

export const addTask = createAsyncThunk<
    Task,
    {
        title: string;
        start_ts: string;
        end_ts: string;
        description?: string;
        priority?: PriorityType;
        type?: TaskType;
        event_id?: number | null;
        date?: string | null;
        for_group?: boolean;
        note?: string;
    },
    { rejectValue: string }
>("tasks/addTask", async (taskData, { rejectWithValue }) => {
    try {
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

export default { getTasks, addTask };
