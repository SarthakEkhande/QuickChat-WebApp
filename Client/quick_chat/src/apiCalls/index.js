import axios from "axios"

export const axiosInstance = axios.create({
  baseURL: '/api', // use this if proxy is set up
  withCredentials: true, // only if you're using cookies/sessions
});
