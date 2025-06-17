import React, { useContext, useState } from 'react';
import { GlobalState } from "../../../GlobalState";
import { Link } from 'react-router-dom';
import "./Cart.css";
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';

const Cart = () => {
  const state = useContext(GlobalState);
  const [cart, setCart] = state.cart;
  const [isLoading, setIsLoading] = useState(false);

  const removeProduct = (id) => {
    setCart(cart.filter(item => item._id !== id));
  };

  const updateQuantity = (id, quantity) => {
    if (quantity < 1) return;
    setCart(cart.map(item => item._id === id ? { ...item, quantity: quantity } : item));
  };

  const getTotal = () => {
    return cart.reduce((prev, item) => prev + (item.price * item.quantity), 0);
  };

  const checkoutHandler = async () => {
    setIsLoading(true);
    const stripe = await loadStripe("pk_test_51Rar4ZPQb3upb9BbQZCxvKgddVkeGDaoS6nIcw4YGejK9rPDT3tgtPWQNqfGNBWZ0dEl4yDgMpIcWhlOMLy3NudI00c4yWdqT3");

    try {
      const response = await axios.post(
        "http://localhost:5000/api/create-checkout-session",
        { cartItems: cart },
        { 
          headers: { 
            'Content-Type': 'application/json',
            // Add authorization header if needed
            // 'Authorization': `Bearer ${token}`
          } 
        }
      );

      const result = await stripe.redirectToCheckout({
        sessionId: response.data.id
      });

      if (result.error) {
        console.error("Stripe redirect error:", result.error.message);
        // Consider showing an error message to the user
      }
    } catch (error) {
      console.error("Checkout error:", error.response?.data || error.message);
      // Show error to user (you could add an error state)
    } finally {
      setIsLoading(false);
    }
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
                <button 
                  onClick={() => updateQuantity(product._id, product.quantity - 1)} 
                  disabled={product.quantity === 1}
                >
                  -
                </button>
                <span>{product.quantity}</span>
                <button onClick={() => updateQuantity(product._id, product.quantity + 1)}>
                  +
                </button>
              </div>
              <h4>Total: ${(product.price * product.quantity).toFixed(2)}</h4>
              <button onClick={() => removeProduct(product._id)}>Remove</button>
            </div>
          </div>
        ))}
      </div>
      <div className="cart-total">
        <h2>Total: ${getTotal().toFixed(2)}</h2>
        <button 
          className="checkout" 
          onClick={checkoutHandler}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <span className="spinner"></span> Processing...
            </>
          ) : (
            "Checkout"
          )}
        </button>
      </div>
    </div>
  );
};

export default Cart;