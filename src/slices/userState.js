import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import userAPI from '../utils/UserAPI';

const initialState = {
    currentUserId: null,
    currentUserName: null,
    currentUserNickname: null,
    currentUserAvatar: null,
    loginStatus: false,
};


export const fetchUserState = createAsyncThunk('userState/fetchUserState', async () => {
    const response = await userAPI.refreshLoad();
    return response?.data;
});


const userStateSlice = createSlice({
    name: 'userState',
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder.addCase(fetchUserState.fulfilled, (state, action) => ({ ...action.payload }));
        builder.addCase(fetchUserState.rejected, () => ({ loginStatus: false }));
    }
});

export default userStateSlice.reducer;
