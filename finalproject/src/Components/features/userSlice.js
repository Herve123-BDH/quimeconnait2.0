import {createSlice} from '@reduxjs/toolkit'
export const userSlice= createSlice({
    name: "user",
    initialState: {
        user: null
    },
    reducers:{
        login: (state, action)=>{
            state.user= action.payload
        },
        logout:(state)=>{
            state.user=null;
        },
        logit:(state)=>{
            state.motdepass=null;
        }
    }
})
export const {login, logout, logit}=userSlice.actions;
export const selectUser=(state)=>state.user.user
export default userSlice.reducer