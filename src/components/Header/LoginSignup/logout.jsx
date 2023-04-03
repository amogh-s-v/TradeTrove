import React from "react"
import "./Form.css";
const Logout = ({userinfo, updateUserinfo, user, updateUser}) => {

    return ( 
        <button className="loginSignupButton" onClick={() => {updateUser({});}} >Logout</button> 
    )
}

export default Logout