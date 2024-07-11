import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { article } from '../utils/ArticleAPI';

const initialState = [];

const uniqueItemsById = (items) => Object.values(items.reduce((result, item) => {
    result[item?.id] = item;
    return result;
}, {}));

export const fetchArticleList = createAsyncThunk('articleList/fetchArticleList', async (params = {}, thunkAPI) => {
    var { sortBy, lastId } = params;
    const response = await article.getArticleList(sortBy, lastId);
    return response;
});


const articleListSlice = createSlice({
    name: 'articleList',
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder.addCase(fetchArticleList.fulfilled, (state, action) => {
            return uniqueItemsById([...state, ...action.payload]);
        });
        builder.addCase(fetchArticleList.rejected, (state, action) => {
            // TODO: handle error
            console.error(action);
        });
    }
});

export default articleListSlice.reducer;
