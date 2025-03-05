import { useState } from "react";
import { Link, useNavigate} from "react-router-dom"

export default function Login() {
    
    const navigate = useNavigate();
    
    const [userCred, setUserCred] = useState({
        email: "",
        password: ""
    });

    const [message, setMessage] = useState({
        type: "invisible-msg",
        text: ""
    });

    function handleInput(event) {
        setUserCred((prevState) => {
            return {...prevState, [event.target.name]:event.target.value};
        })
    }

    function handleSubmit(event) {
        event.preventDefault();
        console.log(userCred);

        fetch("http://localhost:5174/login", {
            method: "POST",
            body: JSON.stringify(userCred),
            headers: {
                "Content-Type":"application/json"
            }
        })
        .then((response) => {
            
            if(response.status === 404) {
                setMessage({type: "error", text: "Email Doesn't Exist"})
            }
            else if (response.status === 403) {
                setMessage({type: "error", text: "Incorrect Password"})
            }

            setTimeout(() => {
                setMessage({type: "invisible-msg", text: ""});
            }, 5000);

            return response.json(); 
            
        })
        .then((data) => {
            console.log(data);

            if(data.token !== undefined) {
                localStorage.setItem("user", JSON.stringify(data));
                navigate("/home");
            }
            
        })
        .catch((err) => {
            console.log(err);
        })
    }
    
    return (    
        <section className="form-parent">
            
            <form className="form" onSubmit={handleSubmit}>
                <h1>Login</h1>
            
                <input className="register-input" required type="email" onChange={handleInput}
                placeholder="Enter Email" name="email"   value={userCred.email}></input>
                <input className="register-input" type="password" required  minLength={8} onChange={handleInput}
                placeholder="Enter Password" name="password" value={userCred.password}></input>
                <button className="register-button">Login</button>
                <p>Don't have a Student Account? <Link to="/register">Create an Account</Link></p>
                <p>Are you an admin? <Link to="/adminLogin">Admin Login</Link></p>
                <p className={message.type}>{message.text}</p>
            
            
            </form>
    
        </section>
    )
}

