import { createSlice } from "@reduxjs/toolkit";

import { getSchedule } from "../actions/scheduleActions";

interface Room {
    id: number;
    name: string;
    building: string;
    building_url: string;
    direction: string;
}

interface Group {
    id: number;
    name: string;
    number: string;
}

interface Lecturer {
    id: number;
    first_name: string;
    middle_name: string;
    last_name: string;
    avatar_id: number;
    avatar_link: string | null;
    description: string;
}

interface ScheduleItem {
    id: number;
    name: string;
    room: Room[];
    group: Group[];
    lecturer: Lecturer[];
    start_ts: string;
    end_ts: string;
}

interface ScheduleState {
    items: ScheduleItem[];
    total: number;
    loading: boolean;
    error: string | null;
}

const initialState: ScheduleState = {
    items: [],
    total: 0,
    loading: false,
    error: null,
};

const scheduleSlice = createSlice({
    name: "schedule",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getSchedule.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getSchedule.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload.items;
                state.total = action.payload.total;
            })
            .addCase(getSchedule.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default scheduleSlice.reducer;
