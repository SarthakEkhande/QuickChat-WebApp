import Header from "./components/header";
import Sidebar from "./components/sidebar";

function HomePage(){
 return (
        <div className="home-page">
            <Header></Header>
            <div className="main-content">
                <Sidebar></Sidebar>
                {/* {selectedChat && <ChatArea socket={socket}></ChatArea>} */}
            </div>
        </div>
    );}

export default HomePage