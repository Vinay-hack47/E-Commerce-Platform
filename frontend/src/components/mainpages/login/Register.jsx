import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import "./Register.css";

const Register = () => {
  const [user, setUser] = useState({
    name: "",
    email: '',
    password: '',
    role: 0 // Default role
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: name === 'role' ? Number(value) : value });
  };

  // Handle form submission
  const registerSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/user/register", { ...user });

      localStorage.setItem("firstRegister", true);

      window.location.href = "/";

    } catch (error) {
      if (error.response) {
        console.log(error.response.data.msg);
      } else if (error.request) {
        console.log("No response received from the server.");
      } else {
        console.log("Error:", error.message);
      }
    }
  };

  return (
    <div className='register-page'>
      <form onSubmit={registerSubmit} className='register-form'>
        <h2 className='register-title'>Register</h2>
        <input
          type='text'
          name='name'
          required
          placeholder='Name'
          value={user.name}
          onChange={handleChange}
          className='register-input'
        />
        <input
          type='email'
          name='email'
          required
          placeholder='Email'
          value={user.email}
          onChange={handleChange}
          className='register-input'
        />
        <input
          type='password'
          name='password'
          required
          placeholder='Password'
          value={user.password}
          onChange={handleChange}
          className='register-input'
        />
        <div className='role-selection'>
          <label>
            <input
              type='radio'
              name='role'
              value={0}
              checked={user.role === 0}
              onChange={handleChange}
            />
            User
          </label>
          <label>
            <input
              type='radio'
              name='role'
              value={1}
              checked={user.role === 1}
              onChange={handleChange}
            />
            Admin
          </label>
        </div>
        <div className='row'>
          <button type="submit" className='register-btn'>Register</button>
          <Link to='/login' className='login-link'>Login</Link>
        </div>
      </form>
    </div>
  );
};

export default Register;