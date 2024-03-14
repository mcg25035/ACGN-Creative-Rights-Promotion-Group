import { createSlice } from '@reduxjs/toolkit';
import { parseCookies } from '../utils/commonUtils';

const initialState = parseCookies()?.authorization ?? null;

const loginToken = createSlice({
    name: 'loginToken',
    initialState,
    reducers:{},
});

export default loginToken.reducer;
