import React, { useState } from "react";
import userService from "../services/user";

const Login = ({ setLoggedin }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const onSubmitForm = (e) => {
        e.preventDefault();
        const loginParams = { user_name: username, user_password: password };
        userService.loginUser(loginParams)
            .then(returnedFlag => {
                if (returnedFlag) { setLoggedin(returnedFlag); }
                else { setMessage("Username or Password incorrect."); }
            })
            .catch(() => setMessage("Something went wrong."));
    }

    return (
        <div className="mx-auto border border-3 rounded mt-5" style={{backgroundColor:"#D3C074", width:"600px"}}>
            <h1 className="text-center mt-3">Welcome</h1>
            <form className="mx-auto" style={{width:"500px"}} onSubmit={onSubmitForm}>
                <input type="text" className="form-control mt-1" placeholder="Username" required minLength={5} maxLength={25} value={username} onChange={e => setUsername(e.target.value)}/>
                <input type="password" className="form-control mt-1" placeholder="Password" required minLength={5} maxLength={25} value={password} onChange={e => setPassword(e.target.value)}/>
                <div className="d-grid mt-4 mb-4">
                    <button className="btn" style={{backgroundColor:"grey", color:"white"}}>Login</button>
                </div>
                <p className="text-center text-danger mt-2">{message}</p>
            </form>
        </div>
    )
}

export default Login;