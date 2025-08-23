import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { hideLoader, showLoader } from "../../../redux/loaderSlice";
import { setallchats, setselectedChat } from "../../../redux/userSlice";
import { createNewChat } from "../../../apiCalls/chat";
import moment from "moment";

function UserList({ searchKey }) {
  const dispatch = useDispatch();
  const {
    user: currentUser,
    allusers,
    selectedChat,
    allchats,
    lastmessage
  } = useSelector((state) => state.userReducer);

  const createNewChats = async (searchUserid) => {
    let response=null
    try {
      dispatch(showLoader());
       response = await createNewChat([currentUser._id, searchUserid]);
      dispatch(hideLoader());

      if (response.success) {
              console.log("setallUser", response);
            toast.success(response.message);
             const newChat = response.data
            const updatedChat =[...allchats,newChat]
            dispatch(setallchats(updatedChat))
           dispatch(setselectedChat(newChat))
              
            }
    } catch (error) {
      toast.error(response.message);
      dispatch(hideLoader());
    }
  };

  const openChat=async(selecteduserid)=>{
    const chat=allchats.find(chat=>chat.members.map(m=>m._id).includes(currentUser._id) &&
    chat.members.map(m=>m._id).includes(selecteduserid)
)

   if(chat){
    dispatch(setselectedChat(chat))
   }




  }
   const IsSelectedChats=(user)=>{
    if(selectedChat){
      return  selectedChat.members.map(m=>m._id).includes(user._id)
    }

   }



const getLastMessageTimeStamp=(userId)=>{
   const chat=allchats.find(chat=>chat.members.map(m=>m._id).includes(userId))

   if(!chat && chat?.lastmessage){
    return ""
   }else{
      return moment(chat?.lastmessage?.createdAt).format("hh:mm A")
   }
   }
   const getLastMessage=(userID)=>{
   const chat=allchats.find(chat=>chat.members.map(m=>m._id).includes(userID))

   if(!chat){
    return ""
   }else{
    const messagePrefix= chat?.lastmessage?.sender===currentUser._id ? "You : " :""
   return messagePrefix  + chat?.lastmessage?.text?.substring(0,25)
   }
   }

   const formatName=(user)=>{
    const fname=user.firstName.at(0).toUpperCase() + user.firstName.slice(1).toLowerCase()
    const lname=user.lastname.at(0).toUpperCase() + user.lastname.slice(1).toLowerCase()

    return fname + " " + lname

   }
  return allusers
    .filter(
      (user) =>
        ((user.firstName.toLowerCase().includes(searchKey.toLowerCase()) ||
          user.lastname.toLowerCase().includes(searchKey.toLowerCase())) &&
          searchKey) ||
        allchats.some((chat) => chat.members.map(m=>m._id).includes(user._id))
    )
    .map((user) => {
      return (
        <div className="user-search-filter" key={user._id} onClick={()=>openChat(user._id)}>
          <div className={IsSelectedChats(user) ? "selected-user" : "filtered-user"}>
            <div className="filter-user-display">
              {user.profilePic ? (
                <img
                  src={user.profilePic}
                  alt="Profile Pic"
                  className="user-profile-image"
                />
              ) : (
                <div className={IsSelectedChats(user) ? "user-selected-avatar" : "user-default-avatar" }>
                  {user.firstName.charAt(0).toUpperCase() +
                    user.lastname.charAt(0).toUpperCase()}
                </div>
              )}
              <div className="filter-user-details">
                <div className="user-display-name">
                  {formatName(user)}
                </div>
                <div className="user-display-email">{getLastMessage(user._id) || user.email}</div>
              </div>
              <div class="last-message-timestamp">{getLastMessageTimeStamp(user._id)}</div>
              {!allchats.find((chat) => chat.members.map(m=>m._id).includes(user._id)) && (
                <div className="user-start-chat">
                  <button
                    className="user-start-chat-btn"
                    onClick={()=>createNewChats(user._id)}
                  >
                    Start Chat
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      );
    });
}

export default UserList;
