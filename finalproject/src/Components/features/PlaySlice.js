import {createSlice} from '@reduxjs/toolkit'
export const PlaySlice= createSlice({
    name: "player",
    initialState: {
        player: null
    },
    reducers:{
        PlayInfo: (state, action)=>{
            state.player= action.payload
        }
    }
})
export const {PlayInfo}=PlaySlice.actions;
export const selectplayer=(state)=>state.player.player
export default PlaySlice.reducer