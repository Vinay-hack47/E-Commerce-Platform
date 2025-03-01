import React from 'react'
import { Link } from 'react-router-dom'
import "./ProductList.css"
import { GlobalState } from "../../../../../src/GlobalState";
import { useContext } from 'react';
import DeleteProduct from '../../../admin-features/DeleteProduct';

const ProductList = ({ product }) => {
  const state = useContext(GlobalState);
  const [userRole] = state.userRole;
  const [cart, setCart] = state.cart;


  const addToCart = (product) => {
    const check = cart.every(item => {
      return item._id !== product._id;
    });

    if (check) {
      setCart([...cart, { ...product, quantity: 1 }]);
    } else {
      alert("Product already added to the cart");
    }
  };

  return (
    <div className='product_card'>
      {userRole === "1" && (
        <input
          type="checkbox"
          checked={product.checked}
          onChange={() => handleCheck(product._id)}
        />
      )}
      <img src={product.images.url || product.images} alt="Product Image" />

      <div className='product_box'>
        <h2 title={product.title}>{product.title}</h2>
        <span>${product.price}</span>
        <p>{product.description}</p>
      </div>

      <div className='row-btn'>
        {
          userRole === "1" ?
            <>
              <Link id="#btn_buy" to={`edit/${product._id}`}>Edit
              </Link>

              <Link id="#btn_view" to={`delete/${product._id}`}>Delete</Link>
            </>
            :
            <>
              <Link id="#btn_buy" to={`#!`} onClick={() => {
                addToCart(product)
              }}>Buy
              </Link>

              <Link id="#btn_view" to={`detail/${product._id}`}>View</Link>
            </>
        }
      </div>
    </div>
  )
}

export default ProductList
