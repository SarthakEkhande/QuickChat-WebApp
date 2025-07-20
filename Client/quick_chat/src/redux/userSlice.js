import { createSlice } from "@reduxjs/toolkit";

const userslice=createSlice({
    name:"user",
    initialState:{user:null,allusers:[]},
    reducers:{
        setUser:(state,action)=>{state.user = action.payload},
        setallUser:(state,action)=>{state.allusers = action.payload},

    }
})

export const {setUser,setallUser}=userslice.actions
export default userslice.reducer