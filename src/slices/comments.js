import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { article as articleAPI } from '../utils/ArticleAPI';

const initialState = [];

export const fetchComments = createAsyncThunk('comments/fetchComments', async (articleId) => {
    const response = await articleAPI.fetchComments(articleId);
    return response?.data?.comments;
});


const commentSlice = createSlice({
    name: 'comments',
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder.addCase(fetchComments.fulfilled, (state, action) => action.payload);
        builder.addCase(fetchComments.rejected, (state, action) => {
            // TODO: handle error
            console.error(action);
        });
    }
});

export default commentSlice.reducer;
