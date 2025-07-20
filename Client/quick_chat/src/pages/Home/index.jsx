import { useSelector } from "react-redux";
import ChatArea from "./components/chat";
import Header from "./components/header";
import Sidebar from "./components/sidebar";

function HomePage(){
       const {
        user,
     selectedChat
  } = useSelector((state) => state.userReducer);
 return (
        <div className="home-page">
            <Header></Header>
            <div className="main-content">
                <Sidebar></Sidebar>
               {selectedChat && <ChatArea></ChatArea>} 
                {/* {selectedChat && <ChatArea socket={socket}></ChatArea>} */}
            </div>
        </div>
    );}

export default HomePage