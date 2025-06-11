import React, { useContext } from 'react';
import { GlobalState } from "../../../GlobalState";
import { Link } from 'react-router-dom';
import "./Cart.css";

const Cart = () => {
  const state = useContext(GlobalState);
  const [cart, setCart] = state.cart;
  

  const removeProduct = (id) => {
    setCart(cart.filter(item => item._id !== id));
  };

  const updateQuantity = (id, quantity) => {
    setCart(cart.map(item => item._id === id ? { ...item, quantity: quantity } : item));
  };

  const getTotal = () => {
    return cart.reduce((prev, item) => prev + (item.price * item.quantity), 0);
  };

  if (cart.length === 0) {
    return <div style={{ textAlign: "center", fontSize: "3rem" }}>Cart is empty</div>;
  }

  return (
    <div className="cart-container">
      <h1>Shopping Cart</h1>
      <div className="cart">
        {cart.map(product => (
          <div className="cart-item" key={product._id}>
            <img src={product.images.url} alt={product.title} />
            <div className="cart-details">
              <h2>{product.title}</h2>
              <h3>${product.price}</h3>
              <div className="quantity">
                <button onClick={() => updateQuantity(product._id, product.quantity - 1)} disabled={product.quantity === 1}>-</button>
                <span>{product.quantity}</span>
                <button onClick={() => updateQuantity(product._id, product.quantity + 1)}>+</button>
              </div>
              <h4>Total: ${product.price * product.quantity}</h4>
              <button onClick={() => removeProduct(product._id)}>Remove</button>
            </div>
          </div>
        ))}
      </div>
      <div className="cart-total">
        <h2>Total: ${getTotal()}</h2>
        <button className="checkout">Checkout</button>
      </div>
    </div>
  );
};

export default Cart;