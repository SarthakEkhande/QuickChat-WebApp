import React, { useState } from "react";
import { Link } from "react-router-dom";
// import { signupUser } from './../../apiCalls/auth';
// import { toast } from 'react-hot-toast';
// import { useDispatch } from "react-redux";
// import { showLoader, hideLoader } from "../../redux/loaderSlice";
import { SignupUser } from "../../apiCalls/auth.js";
function Signup(){
  const [user,setUser]=useState({
    firstName:"",
    lastname :"",
    email:"",
    password:""
  })
const onFormSubmit = async (event) => {
  event.preventDefault();
  console.log("user", user);
  
  let response = null;
  
  try {
    response = await SignupUser(user);
    console.log("useruser1", response);
    if (response.success) {
      alert(response.message);
    } else {
      alert(response.message);
    }
  } catch (error) {
    alert("Something went wrong: " + (error?.message || "Unknown error"));
    console.error("Signup error:", error);
  }
};

    return (
        <div className="container">
        <div className="container-back-img"></div>
        <div className="container-back-color"></div>
        <div className="card">
            <div className="card_title">
                <h1>Create Account</h1>
            </div>
            <div className="form">
                <form onSubmit={onFormSubmit }>
                    <div className="column">
                        <input type="text" placeholder="First Name" 
                            value={user.firstName} 
                            onChange={(e) => setUser({...user, firstName: e.target.value})} />
                        <input type="text" placeholder="Last Name" 
                            value={ user.lastname }
                            onChange={(e) => setUser({...user, lastname: e.target.value})}/>
                    </div>
                    <input type="email" placeholder="Email" 
                        value={ user.email }
                        onChange={(e) => setUser({...user, email: e.target.value})}/>
                    <input type="password" placeholder="Password" 
                        value={ user.password }
                        onChange={(e) => setUser({...user, password: e.target.value})}/>
                    <button>Sign Up</button>
                </form>
            </div>
            <div className="card_terms">
                <span>Already have an account?
                    <Link to="/login">Login Here</Link>
                </span>
            </div>
        </div>
    </div>
    )
}

export default Signup;