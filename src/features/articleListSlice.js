import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { article } from '../utils/ArticleAPI';

const initialState = [];

export const fetchArticleList = createAsyncThunk('articleList/fetchArticleList', async ({ sortBy, lastId } = {}) => {
    var lastId = 0;
    const response = await article.getArticleList(sortBy, lastId);
    return response?.data?.articles;
});


const articleListSlice = createSlice({
    name: 'articleList',
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder.addCase(fetchArticleList.fulfilled, (state, action) => action.payload);
        builder.addCase(fetchArticleList.rejected, (state, action) => {
            // TODO: handle error
            console.error(action);
        });
    }
});

export default articleListSlice.reducer;
