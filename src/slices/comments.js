import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { article as articleAPI, comment as commentAPI } from '../utils/ArticleAPI';

const initialState = [];

export const fetchComments = createAsyncThunk('comments/fetchComments', async (articleId) => {
    const response = await articleAPI.fetchComments(articleId);
    return response?.data?.comments || [];
});

export const fetchReplies = createAsyncThunk('comments/fetchReplies', async (params, thunkAPI) => {
    const { articleId, commentId, sortBy, lastId } = params;
    const { rejectWithValue } = thunkAPI;
    try {
        return await commentAPI.fetchReplies(articleId, commentId, sortBy, lastId) || [];
    } catch (e) {
        return rejectWithValue(e);
    }
});

const commentSlice = createSlice({
    name: 'comments',
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder.addCase(fetchComments.fulfilled, (state, action) => {
            return action.payload.map((comment) => ({ ...comment, replieList: [] }));
        });
        builder.addCase(fetchComments.rejected, (state, action) => {
            // TODO: handle error
            console.error(action);
        });

        builder.addCase(fetchReplies.fulfilled, (state, action) => {
            const targetId = action.meta.arg?.commentId;
            const targetComment = state.find(({ id }) => id === targetId);
            if (targetComment) {
                targetComment.replieList = action.payload;
            }
        });

        builder.addCase(fetchReplies.rejected, (state, action) => {
            console.error(action);
        });
    }
});

export default commentSlice.reducer;
