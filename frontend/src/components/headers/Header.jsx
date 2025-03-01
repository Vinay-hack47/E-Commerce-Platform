import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { IoMdMenu, IoMdCloseCircle, IoMdCart } from "react-icons/io";
import "./Header.css";
import { GlobalState } from '../../../src/GlobalState';
import { useContext } from 'react';

const Header = () => {
  // const [userRole, setUserRole] = useState(null);
  const state = useContext(GlobalState);
  const [userRole] = state.userRole;
  const [cart] = state.cart;

  // useEffect(() => {
  //   const role = localStorage.getItem("userRole");
  //   setUserRole(role);
  // }, []);

  const handleLogout = () => {
    localStorage.removeItem("firstLogin");
    localStorage.removeItem("userRole");
    window.location.href = "/login";
  };

  return (
    <header>
      <div className="menu">
        <IoMdMenu size={30} />
      </div>
      <div className="logo">
        <h1>
          {/* <Link to="/">Shop</Link> */}
          {userRole === "1" ? (<ul>Admin</ul>) : (<ul><Link to="/">Shop</Link></ul>)}
        </h1>
      </div>

      <ul>
        <li><Link to="/">Products</Link></li>
        {userRole === '1' && (
          <>
            <li><Link to="/create_product">Create Product</Link></li>
            <li><Link to="/categories">Categories</Link></li>
            <li><Link to="/history">History</Link></li>
          </>
        )}
        {userRole ? (
          <li><Link to="/" onClick={handleLogout}>Logout</Link></li>
        ) : (
          <li><Link to="/login">Login Or Register</Link></li>
        )}
        <li>
          <IoMdCloseCircle size={30} className='menu' />
        </li>
      </ul>

      <div className='cart-icon'>
        <span>{cart.length}</span>
        <Link to="/cart"><IoMdCart size={30} /></Link>
      </div>
      
    </header>
  );
};

export default Header;