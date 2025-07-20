import { useDispatch, useSelector } from "react-redux";
import { createNewMessage } from "../../../apiCalls/message";
import { hideLoader, showLoader } from "../../../redux/loaderSlice";
import toast from "react-hot-toast/headless";
import { useState } from "react";

function Chat() {
     const {
        user,
     selectedChat
  } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  const selectedUser=selectedChat?.members.find(u=>u._id !==user._id)

const [message,setmessage]=useState("")
  const sendmessage=async()=>{
    try{
        const cppmessage ={
            chat :selectedChat._id,
            sender:user._id,
            text : message

        }
        dispatch(showLoader())
      const response = await createNewMessage(cppmessage )
      dispatch(hideLoader())
      if(response.success){
        setmessage("")
      }
    }catch(error){
      dispatch(hideLoader())
      toast.error(error.message)
       return error
    }
  }
  return (
   <div>  {selectedChat && 
   <div class="app-chat-area">
  <div class="app-chat-area-header">
      {/* <!--RECEIVER DATA--> */}
{selectedUser.firstName + " " + selectedUser.lastname}  </div>
 <div class="main-chat-area">
    {/* <div class="message-container" style="justify-content: end;">
        <div class="send-message">Hi There</div>
    </div> */}
</div>
  <div class="send-message-div">
    <input type="text" className="send-message-input" placeholder="Type a message" value={message} onChange={(e)=>setmessage(e.target.value)} />
    <button className="fa fa-paper-plane send-message-btn" aria-hidden="true" onClick={sendmessage}></button>
</div>
</div>
   }
</div>
  );
}

export default Chat;
