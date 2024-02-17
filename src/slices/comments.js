import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { article as articleAPI } from '@/utils/ArticleAPI';

const initialState = [];

export const fetchComments = createAsyncThunk('comments/fetchComments', async (articleid) => {
    const response = await articleAPI.fetchComments(articleid);
    return response?.data?.comments;
});


const articleSlice = createSlice({
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

export default articleSlice.reducer;
