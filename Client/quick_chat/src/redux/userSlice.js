import { createSlice } from "@reduxjs/toolkit";

const userslice=createSlice({
    name:"user",
    initialState:{user:null,
        allusers:[],
        allchats:[]
    },
    reducers:{
        setUser:(state,action)=>{state.user = action.payload},
        setallUser:(state,action)=>{state.allusers = action.payload},
       setallchats:(state,action)=>{state.allchats = action.payload},


    }
})

export const {setUser,setallUser,setallchats}=userslice.actions
export default userslice.reducer