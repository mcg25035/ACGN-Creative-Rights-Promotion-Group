import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import ArticleAPI from '@/utils/ArticleAPI';

const initialState = [];

export const fetchComments = createAsyncThunk('comments/fetchComments', async (articleId) => {
    const article = await ArticleAPI.getArticleById(articleId);
    if (article.articleError) {
        console.error("article fetch error");
        return;
    }

    var result = await article.fetchComments();

    if (result){
        console.error("comments fetch error");
        return;
    }

    try {
        return result;
    } catch (error) {
        console.error(error);
    }
});


const articleSlice = createSlice({
    name: 'comments',
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder.addCase(fetchComments.fulfilled, (state, action) => action.payload);
    }
});

export default articleSlice.reducer;
