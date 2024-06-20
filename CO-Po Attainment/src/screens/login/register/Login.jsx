import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";
import "./login.css";

function Login({ onLogin }) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const response = await axios.post('http://localhost:8000/login', formData, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });
      const token = Cookies.get('subject');
      console.log('Logged in successfully:', response.data);
      console.log('Token:', token);

      // Set the email in cookies
      // Cookies.set('email', "formData.email", { path: '/' });
      
      // Call the onLogin function passed as a prop
      const a =123
      onLogin(a);

      // Navigate to the homepage with the email as state
      navigate('/', { state: { email: formData.email } });
    } catch (error) {
      console.error('There was a problem with your Axios request:', error);
      toast.error('Login failed, please try again.');
    }
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        <div className="form-group my-2 mx-3">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            name="email"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="form-group my-2 mx-3">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}

export default Login;
