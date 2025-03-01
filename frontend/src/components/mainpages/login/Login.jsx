import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import "./Login.css";

const Login = () => {
  const [user, setUser] = useState({
    email: '',
    password: ''
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  // Handle form submission
  const loginSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/user/login", { ...user });

      localStorage.setItem("firstLogin", true);
      localStorage.setItem("userRole", res.data.role);
      localStorage.setItem("token", res.data.accesstoken); 

      window.location.href = "/";

    } catch (error) {
      if (error.response) {
        if(error.response.data.msg === "Incorrect password"){
          alert("Incorrect password");
        }else if(error.response.data.msg === "User not found"){
          alert("User not found");
        }
        else{
          console.log(error.response.data.msg);
        } 
      } else if (error.request) {
        console.log("No response received from the server.");
      } else {
        console.log("Error:", error.message);
      }
    }
  };

  return (
    <div className='login-page'>
      <form onSubmit={loginSubmit} className='login-form'>
        <h2 className='login-title'>Login</h2>
        <input
          type='email'
          name='email'
          required
          placeholder='Email'
          value={user.email}
          onChange={handleChange}
          className='login-input'
        />
        <input
          type='password'
          name='password'
          required
          placeholder='Password'
          value={user.password}
          onChange={handleChange}
          className='login-input'
        />
        <div className='row'>
          <button type="submit" className='login-btn'>Login</button>
          <Link to='/register' className='register-link'>Register</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;