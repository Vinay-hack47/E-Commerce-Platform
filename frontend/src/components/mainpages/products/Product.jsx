import React, { useContext } from 'react'
import { GlobalState } from '../../../GlobalState'
import ProductList from '../utils/ProductList/ProductList'


const Product = ({lists}) => {
//   const state = useContext(GlobalState)
//   const [products] = state.productsAPI.products;
// console.log(state);

// console.log(lists);

return (
  <div className="product">
    <h2>{lists.title}</h2>
    <h6>{lists.price}</h6>
    <p>{lists.description}</p>
    <img src={lists.images} alt="Product image" />
  </div>
);
}

export default Product

