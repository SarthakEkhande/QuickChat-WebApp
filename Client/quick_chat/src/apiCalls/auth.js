import { axiosInstance } from "./index";

export const SignupUser = async (user) => {
  console.log("SignupUser", user);

  try {
    const response = await axiosInstance.post('/auth/signup', user);
    // console.log("useruser2", response); // this will print full response object
    return { success: true, ...response.data };
  } catch (error) {
    // console.log("Signup error", error?.response?.data || error.message);
    return {
      success: false,
      message: error?.response?.data?.message || "Signup failed",
    };
  }
};

export const loginUser = async (user) => {
  try {
    const response = await axiosInstance.post('/auth/login', user);
    return response.data; // { success: true, message: "...", token: "..." }
  } catch (error) {
    return {
      success: false,
      message: error?.response?.data?.message || "Login failed",
    };
  }
};
