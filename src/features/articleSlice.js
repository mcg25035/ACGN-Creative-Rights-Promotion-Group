import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { article as articleAPI } from '../utils/ArticleAPI';

const initialState = {};

export const fetchArticle = createAsyncThunk('article/fetchArticle', async (articleId) => {
    return await articleAPI.getArticleById(articleId);
});


const articleSlice = createSlice({
    name: 'article',
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder.addCase(fetchArticle.fulfilled, (state, action) => action.payload);
        builder.addCase(fetchArticle.rejected, (state, action) => {
            // TODO: handle error
            console.error(action);
        });
    }
});

export default articleSlice.reducer;
