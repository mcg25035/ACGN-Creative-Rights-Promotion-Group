import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = [];

export const fetchComments = createAsyncThunk('comments/fetchComments', async (articleId) => {
    const url = `/api/articles/${articleId}/comments`;
    try {
        const response = await axios.get(url, { params: { sortBy: 'date-sb', lastId: 0 } });
        return response?.data;
    } catch (error) {
        console.error(error);
    }
});


const articleSlice = createSlice({
    name: 'comments',
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder.addCase(fetchComments.fulfilled, (state, action) => action.payload);
    }
});

export default articleSlice.reducer;
