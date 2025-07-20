import { useSelector } from "react-redux";

function UserList({ searchKey }) {
  const { allusers } = useSelector((state) => state.userReducer);
  return allusers
    .filter(
      (user) =>
        (user.firstName.toLowerCase().includes(searchKey.toLowerCase()) ||
          user.lastname.toLowerCase().includes(searchKey.toLowerCase())) &&
        searchKey
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
              <div className="user-start-chat">
                <button className="user-start-chat-btn">Start Chat</button>
              </div>
            </div>
          </div>
        </div>
      );
    });
}

export default UserList;
