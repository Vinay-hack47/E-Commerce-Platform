import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import "../ProductList/ProductList.css"
import { Link } from 'react-router-dom';
import "./DetailProduct.css";


const DetailProduct = ({ products }) => {
  const { id } = useParams();
  const [detailProduct, setDetailProduct] = useState(null);
  

  useEffect(() => {
    if (id && products.length > 0) {
      const filterProduct = products.find(product => product._id === id);
      setDetailProduct(filterProduct);
    }
  }, [id, products]);

  if (!detailProduct) return <div>Loading...</div>;

  return (
    <div className='detail'>
      <img src={detailProduct.images} alt={detailProduct.title} />
      <div className='box-detail'> 
        <div className='row'>
          <h2>{detailProduct.title}</h2>
          <h6>{detailProduct.product_id}</h6>
        </div>
        <span>${detailProduct.price}</span>
        <p>{detailProduct.description}</p>
        <p>{detailProduct.content}</p>
        <p>{detailProduct.sold}</p>
        <Link to="/cart">Buy Now</Link>
      </div>
    </div>
  );
};


export default DetailProduct;
