import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../libs/api";
import type { ExamType } from "../Types";

interface ExamState {
    items: ExamType[];
    loading: boolean;
    error: string | null;
}

const initialState: ExamState = {
    items: [],
    loading: false,
    error: null,
};

export const fetchExams = createAsyncThunk("exams/fetchExams", async (_, { rejectWithValue }) => {
    try {
        const response = await api.get("/exams");
        return response.data;
    } catch (error: any) {
        return rejectWithValue(error.response?.data?.message || "Failed to fetch exams");
    }
});

const examSlice = createSlice({
    name: "exams",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchExams.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchExams.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchExams.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default examSlice.reducer;
