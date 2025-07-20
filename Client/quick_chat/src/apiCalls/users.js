import { axiosInstance } from "."


export const getLoggedUser=async()=>{
try{
    const response =await axiosInstance.get('/user/get-logged-user')
    return response.data

}catch(error){

}
}

export const getAllUsers=async()=>{
try{
    const response =await axiosInstance.get('/user/get-all-users')
    return response.data

}catch(error){

}
}