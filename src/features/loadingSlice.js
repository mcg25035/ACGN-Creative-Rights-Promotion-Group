import { createSlice } from '@reduxjs/toolkit';

const initialState = { loading: false };

const loading = createSlice({
    name: 'loading',
    initialState,
    reducers:{
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
    },
});

export const { setLoading } = loading.actions;

export default loading.reducer;
