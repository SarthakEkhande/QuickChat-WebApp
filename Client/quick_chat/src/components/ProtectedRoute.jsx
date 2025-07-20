import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { getAllUsers, getLoggedUser } from "../apiCalls/users.js";
import { useDispatch, useSelector } from "react-redux";
import { hideLoader, showLoader } from "../redux/loaderSlice.js";
import toast from "react-hot-toast";
import { setallchats, setallUser, setUser } from "../redux/userSlice.js";
import { getAllChats } from "../apiCalls/chat.js";

export const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userReducer);

  const [redirectToLogin, setRedirectToLogin] = useState(false);
  const [loading, setLoading] = useState(true); // control rendering until auth is checked

  const getloggeduser = async () => {
    try {
      dispatch(showLoader());
      const response = await getLoggedUser();
      dispatch(hideLoader());

      if (response.success) {
        dispatch(setUser(response.data));
        setLoading(false);
      } else {
        toast.error(response.message);
        setRedirectToLogin(true);
      }
    } catch (error) {
      dispatch(hideLoader());
      setRedirectToLogin(true);
    }
  };
  const getAllUser = async () => {
    try {
      dispatch(showLoader());
      const response = await getAllUsers();
      dispatch(hideLoader());

      if (response.success) {
        console.log("setallUser", response);

        dispatch(setallUser(response.data));
        setLoading(false);
      } else {
        toast.error(response.message);
        setRedirectToLogin(true);
      }
    } catch (error) {
      dispatch(hideLoader());
      setRedirectToLogin(true);
    }
  };
  const getallcurrentchats = async () => {
    try {
      dispatch(showLoader());
      const response = await getAllChats();
      dispatch(hideLoader());

      if (response.success) {
        console.log("setallUser", response);

        dispatch(setallchats(response.data));
        setLoading(false);
      } else {
        toast.error(response.message);
        setRedirectToLogin(true);
      }
    } catch (error) {
      dispatch(hideLoader());
      setRedirectToLogin(true);
    }
  };

  useEffect(() => {
    if (!token) {
      setRedirectToLogin(true);
    } else {
      getloggeduser();
      getAllUser();
      getallcurrentchats();
    }
  }, []);

  // Navigate to login if needed
  if (redirectToLogin) {
    return <Navigate to="/login" />;
  }

  // Optionally show loader or nothing until check completes
  if (loading) {
    return <p>Loading...</p>; // You can replace this with your <Loader /> component
  }

  return <>{children}</>;
};
