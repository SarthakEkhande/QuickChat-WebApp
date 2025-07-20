import { axiosInstance } from "."

export const createNewMessage=async(message)=>{
    try{
        const response = await axiosInstance.post('/message/new-messages',message)

     return response.data
    }catch(error){
        return error
    }
}