import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { getLoggedUser } from "../apiCalls/users.js";
import { useDispatch } from "react-redux";
import { hideLoader, showLoader } from "../redux/loaderSlice.js";

export const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const [user,setuser]=useState(null)
      const dispatch = useDispatch();

const getloggeduser=async()=>{
  let response =null
  try{
            dispatch(showLoader());
    
     response=await getLoggedUser()
          dispatch(hideLoader());
     
     if(response.success){
           setuser(response.data)

     }else{
          return <Navigate to="/login" replace />;

     }

  }catch(error){
         dispatch(hideLoader());
    
    return <Navigate to="/login" replace />;

  }
}

useEffect(()=>{
    if (!token) {
    return <Navigate to="/login" replace />;
  }else{
getloggeduser()
  }
},[])
  return <div>
    <p>{user?.firstName + " " + user?.lastname}</p>
    {children}
    </div>;
};
