import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import ArticleAPI from '../ArticleAPI';

const initialState = {};

export const fetchArticle = createAsyncThunk('article/fetchArticle', async (articleId) => {
    const article = await ArticleAPI.getArticleById(articleId);
    article.init();

    if (article.articleError) {
        console.error("article fetch error");
        return;
    }

    return article;
});


const articleSlice = createSlice({
    name: 'article',
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder.addCase(fetchArticle.fulfilled, (state, action) => action.payload);
    }
});

export default articleSlice.reducer;
