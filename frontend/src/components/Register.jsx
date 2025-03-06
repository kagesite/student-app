import { data, Link } from "react-router-dom"
import { useState } from "react";

export default function Register() {

    const [userDetails, setUserDetails] = useState({
        username: "",
        email: "",
        firstname: "",
        lastname: "",
        password: "",
        telephone: "",
        address: ""
    })

    const [message, setMessage] = useState({
        type: "invisible-msg",
        text: ""
    });

    function handleInput(event) {
        setUserDetails((prevState) =>{
            return {...prevState, [event.target.name]:event.target.value};
        })
    }

    function handleSubmit(event) {
        event.preventDefault();
        console.log(userDetails);

        fetch("http://localhost:3001/students/create", {
            method: "POST",
            body: JSON.stringify(userDetails),
            headers: {
                "Content-Type":"application/json"
            }
        })
        .then((response) => {
            if(response.status === 500) {
                setMessage({type: "error", text: "Server Error"});
                resolve();
            }
            else if (response.status === 400) {
                setMessage({type: "error", text: "Email Already in Use"});
                resolve();
            }
            else {
                setMessage({type: "success", text: "Sucessful Account Creation"});
            }

            return response.json()
        })
        .then((data) => {

            console.log(data);



            setTimeout(() => {
                setMessage({type: "invisible-msg", text: ""});
            }, 5000);

            setUserDetails({
                username: "",
                email: "",
                firstname: "",
                lastname: "",
                password: "",
                telephone: "",
                address: ""
            });
        })
        .catch((err) => {
            console.log(err);
        })
    }




    return (
        <section className="form-parent" onSubmit={handleSubmit}>
            
            <form className="form">
                <h1>Register</h1>

                <input className="register-input" type="text"  onChange={handleInput} placeholder="Enter Username" name="username" value={userDetails.username} required></input>
                <input className="register-input" type="text"  onChange={handleInput} placeholder="Enter First Name" name="firstname" value={userDetails.firstname} required></input>
                <input className="register-input" type="text"  onChange={handleInput} placeholder="Enter Last Name" name="lastname" value={userDetails.lastname} required></input>
                <input className="register-input" type="email" onChange={handleInput} placeholder="Enter Email" name="email" value={userDetails.email} required></input>
                <input className="register-input" type="password" onChange={handleInput} placeholder="Enter Password" name="password" value={userDetails.password} required minLength={8}></input>
                <input className="register-input" type="tel" onChange={handleInput} placeholder="Enter Telephone" name="telephone" value={userDetails.telephone} required pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"></input>
                <input className="register-input" type="text" onChange={handleInput} placeholder="Enter Address" name="address" value={userDetails.address} required></input>
            
                <button className="register-button">Join</button>
                <p>Already Registered? <Link to='/login'>Login to your Account</Link></p>
                <p className={message.type}>{message.text}</p>
            
            </form>

        </section>
    )
}