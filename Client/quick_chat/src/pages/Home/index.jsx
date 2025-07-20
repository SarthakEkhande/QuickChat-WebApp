import Header from "./components/header";

function HomePage(){
 return (
        <div className="home-page">
            <Header></Header>
            <div className="main-content">
                {/* <Sidebar socket={socket} onlineUser={onlineUser}></Sidebar>
                {selectedChat && <ChatArea socket={socket}></ChatArea>} */}
            </div>
        </div>
    );}

export default HomePage