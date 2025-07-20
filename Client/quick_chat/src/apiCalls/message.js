import { axiosInstance } from "."

export const createNewMessage=async(message)=>{
    try{
        const response = await axiosInstance.post('/message/new-messages',message)

     return response.data
    }catch(error){
        return error
    }
}

export const gettAllmessages=async(chatId)=>{
    try{
        const response = await axiosInstance.get(`/message/get-all-messages/${chatId}`)

     return response.data
    }catch(error){
        return error
    }
}