import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const GlobalState = createContext();

export const DataProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [products, setProducts] = useState([]);
  const [userRole, setUserRole] = useState(null);
  const [cart, setCart] = useState([]);

  const refreshToken = async () => {
    try {
      const res = await axios.get('https://e-commerce-platform-hbbx.onrender.com/user/refresh_token');
      setToken(res.data.accesstoken);
    } catch (err) {
      console.error('Error refreshing token', err);
    }
  };

  useEffect(() => {
    const firstLogin = localStorage.getItem('firstLogin');
    if (firstLogin) refreshToken();
  }, []);

  useEffect(() => {
    const role = localStorage.getItem('userRole');
    setUserRole(role);
  }, []);

  useEffect(() => {
    if (token) {
      axios.get('https://e-commerce-platform-hbbx.onrender.com/user/infor', {
        headers: { Authorization: token }
      }).then(res => {
        setUserRole(res.data.role); // Set user role
      }).catch(err => {
        console.error('Error fetching user info', err);
      });
    }
  }, [token]);

  const state = {
    token: [token, setToken],
    products: [products, setProducts],
    userRole: [userRole, setUserRole],
    cart: [cart, setCart] // Add cart to state
  };
  

  return (
    <GlobalState.Provider value={state}>
      {children}
    </GlobalState.Provider>
  );
};