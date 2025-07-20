import { axiosInstance } from "."

export const getAllChats=async()=>{
    try{
        const response = await axiosInstance.get('/chat/get-all-chat')

     return response.data
    }catch(error){
        return error
    }
}

export const createNewChat=async(members)=>{
    try{
        const response = await axiosInstance.post('chat/create-new-chat',{members})

     return response.data
    }catch(error){
        return error
    }
}