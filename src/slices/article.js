import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {};

export const fetchArticle = createAsyncThunk('article/fetchArticle', async (articleId) => {
    const url = `/api/articles/${articleId}`;
    try {
        const response = await axios.get(url);
        return response?.data;
    } catch (error) {
        console.error(error);
    }
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
