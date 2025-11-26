import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../libs/api";
import type { DocumentType } from "../Types";

interface DocumentState {
    items: DocumentType[];
    loading: boolean;
    error: string | null;
}

const initialState: DocumentState = {
    items: [],
    loading: false,
    error: null,
};

export const fetchDocuments = createAsyncThunk("documents/fetchDocuments", async (_, { rejectWithValue }) => {
    try {
        const response = await api.get("/documents");
        return response.data;
    } catch (error: any) {
        return rejectWithValue(error.response?.data?.message || "Failed to fetch documents");
    }
});

const documentSlice = createSlice({
    name: "documents",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchDocuments.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchDocuments.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchDocuments.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default documentSlice.reducer;
