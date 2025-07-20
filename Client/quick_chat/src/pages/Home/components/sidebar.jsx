import { useState } from "react"
import Search from "./search.jsx"

function Sidebar(){
    const [searchKey,setSearchKey]=useState("")
    console.log("searchKey",searchKey);
    
    return(
        <div className="app-sidebar">
          <Search searchKey={searchKey}setSearchKey={setSearchKey} ></Search>

        </div>
)
}

export default Sidebar