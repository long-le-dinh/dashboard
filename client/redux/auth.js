import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import request from '../lib/auth';

export const LoginForm = createAsyncThunk('fetch/login',async(formData) =>{
    const response = await request.post('/login',formData);
    return response.data;
})

const initialState = {
    isLogin: false,
    user:{}
}

const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers:{
        getUserByToken(state,action){
            state.user = action.payload.data;
            
            state.isLogin = true;
        },
    },
    extraReducers: (builder)=>{
        builder.addCase(LoginForm.fulfilled,(state,action)=>{
            state.isLogin = true;
            state.user = action.payload;
        })
        .addCase(LoginForm.pending,(state)=>{
            state.isLogin=false;
        })
        .addCase(LoginForm.rejected,(state)=>{
            state.isLogin=false;
        })
    }
})
export const {getUserByToken} = loginSlice.actions
export default loginSlice.reducer