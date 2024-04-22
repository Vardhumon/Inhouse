import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import "./login.css";
import Cookies from 'js-cookie';


function Login() {

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleChangeEmail = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleChangePass = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8000/login', formData, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
            const token = Cookies.get('subject')
            console.log('LoggedIn successfully:', token);
            return token;
            // Do something with the response data if needed
        } catch (error) {
            console.error('There was a problem with your Axios request:', error);
        }
    };


    const registerUser = async (e) => {
        e.preventDefault();
        const { name, email, password } = data;
        try {
            const { data } = await axios.post("/register", {
                name,
                email,
                password,
            });
            if (data.error) {
                toast.error(data.error);
            } else {
                setData({});
                toast.success("Login Successful. welcome");
                container.classList.remove("active");
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <form>
                <div className="form-group my-2 mx-3">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" name="email" aria-describedby="emailHelp" placeholder="Enter email" onChange={handleChangeEmail} />
                </div>
                <div className="form-group my-2 mx-3">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" name="password" placeholder="Password" onChange={handleChangePass} />
                </div>
                <button type="submit" onClick={handleLogin} className="btn btn-primary">Submit</button>
            </form>
        </div>

    );
}

export default Login;
