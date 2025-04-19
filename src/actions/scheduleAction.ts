import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiRoutes } from "@config/apiRoutes";
import axios, { AxiosError } from "axios";

export const getSchedule = createAsyncThunk(
    "get/schedule",
    async (
        data: { groupId: number; start: string; end: string },
        { rejectWithValue }
    ) => {
        try {
            const response = await axios.get(apiRoutes.schedule, {
                headers: {
                    "Content-Type": "application/json",
                },
                params: {
                    group_id: data.groupId,
                    start: data.start,
                    end: data.end,
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
