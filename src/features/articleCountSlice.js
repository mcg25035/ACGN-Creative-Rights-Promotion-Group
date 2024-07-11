import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { article as articleAPI } from '../utils/ArticleAPI';

const initialState = {};

export const fetchArticleCount = createAsyncThunk('article/fetchArticleCount', async (params, thunkAPI) => {
    var { rejectWithValue } = thunkAPI;
    try{
        return await articleAPI.getArticleCount();
    }
    catch(e){
        return rejectWithValue(e);
    }
});


const articleCountSlice = createSlice({
    name: 'articleCount',
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder.addCase(fetchArticleCount.fulfilled, (state, action) => action.payload);
        builder.addCase(fetchArticleCount.rejected, (state, action) => {
            // TODO: handle error
            console.error(action);
        });
    }
});

export default articleCountSlice.reducer;
