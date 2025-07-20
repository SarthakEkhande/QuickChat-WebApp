import { createSlice } from "@reduxjs/toolkit";

const loaderslice=createSlice({
    name:"loader",
    initialState:{loader:false},
    reducers:{
        showLoader:(state)=>{state.loader = true},
        hideLoader:(state)=>{state.loader = false}
    }
})

export const {showLoader,hideLoader}=loaderslice.actions
export default loaderslice.reducer