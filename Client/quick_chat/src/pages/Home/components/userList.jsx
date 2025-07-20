import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { hideLoader, showLoader } from "../../../redux/loaderSlice";
import { setallchats } from "../../../redux/userSlice";
import { createNewChat } from "../../../apiCalls/chat";

function UserList({ searchKey }) {
  const dispatch = useDispatch();
  const {
    user: currentUser,
    allusers,
    allchats,
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

              
            }
    } catch (error) {
      toast.error(response.message);
      dispatch(hideLoader());
    }
  };
  return allusers
    .filter(
      (user) =>
        ((user.firstName.toLowerCase().includes(searchKey.toLowerCase()) ||
          user.lastname.toLowerCase().includes(searchKey.toLowerCase())) &&
          searchKey) ||
        allchats.some((chat) => chat.members.includes(user._id))
    )
    .map((user) => {
      return (
        <div className="user-search-filter">
          <div className="filtered-user">
            <div className="filter-user-display">
              {user.profilePic ? (
                <img
                  src={user.profilePic}
                  alt="Profile Pic"
                  className="user-profile-image"
                />
              ) : (
                <div className="user-default-profile-pic">
                  {user.firstName.charAt(0).toUpperCase() +
                    user.lastname.charAt(0).toUpperCase()}
                </div>
              )}
              <div className="filter-user-details">
                <div className="user-display-name">
                  {user.firstName + " " + user.lastname}
                </div>
                <div className="user-display-email">{user.email}</div>
              </div>
              {!allchats.find((chat) => chat.members.includes(user._id)) && (
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
