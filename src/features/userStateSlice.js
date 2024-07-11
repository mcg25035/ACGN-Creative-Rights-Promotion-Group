import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import userAPI from '../utils/UserAPI';

const initialState = {
    currentUserId: "",
    currentUserName: "",
    currentUserNickname: "",
    currentUserAvatar: "",
    loginStatus: false,
};


export const fetchUserState = createAsyncThunk('userState/fetchUserState', async () => {
    const res = await userAPI.refreshLoad();
    return res;
});


const userStateSlice = createSlice({
    name: 'userState',
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder.addCase(fetchUserState.fulfilled, (state, action) => {
            return ({ ...action.payload,  loginStatus: true });
        });
        builder.addCase(fetchUserState.rejected, () => ({ loginStatus: false }));
    }
});

export default userStateSlice.reducer;
