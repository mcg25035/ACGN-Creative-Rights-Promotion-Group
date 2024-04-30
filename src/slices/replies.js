import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { article as articleAPI } from '../utils/ArticleAPI';

const initialState = [];

export const fetchReplies = createAsyncThunk('replies/fetchComments', async ({ articleId, commentId, sortBy, lastId }, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
        return await articleAPI.fetchReplies(articleId, commentId, sortBy, lastId);
    } catch (e) {
        return rejectWithValue(e);
    }
});


const repliesSlice = createSlice({
    name: 'replies',
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder.addCase(fetchReplies.fulfilled, (state, action) => action.payload);
        builder.addCase(fetchReplies.rejected, (state, action) => {
            console.error(action);
        });
    }
});

export default repliesSlice.reducer;
