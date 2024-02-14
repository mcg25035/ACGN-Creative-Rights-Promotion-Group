import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = [];

export const fetchArticleList = createAsyncThunk('articleList/fetchArticleList', async () => {
    const url = '/api/articles';
    try {
        const response = await axios.get(url, { params: { sortBy: 'date-sb', lastId: 0 } });
        return response?.data?.articles;
    } catch (error) {
        // TODO: error handle
        console.error(error);
    }
});


const articleListSlice = createSlice({
    name: 'articleList',
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder.addCase(fetchArticleList.fulfilled, (state, action) => action.payload);
    }
});

export default articleListSlice.reducer;
