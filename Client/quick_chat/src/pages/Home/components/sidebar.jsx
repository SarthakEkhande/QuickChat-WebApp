import { useState } from "react"
import Search from "./search.jsx"
import UserList from "./userList.jsx";

function Sidebar(){
    const [searchKey,setSearchKey]=useState("")
    console.log("searchKey",searchKey);
    
    return(
        <div className="app-sidebar">
          <Search searchKey={searchKey}setSearchKey={setSearchKey} ></Search>
        <UserList searchKey={searchKey}></UserList>
        
        </div>
)
}

export default Sidebar