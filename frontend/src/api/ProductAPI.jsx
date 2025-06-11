import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductList from '../components/mainpages/utils/ProductList/ProductList';
import DetailProduct from '../components/mainpages/utils/DetailProducts/DetailProduct';
import "../components/mainpages/utils/ProductList/ProductList.css";
import { Routes, Route } from 'react-router-dom';

const ProductAPI = () => {
  const [products, setProducts] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5000/api/products")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        setErrorMessage("Error fetching products");
      });
  }, []);

  return (
    <>
      <div>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
      </div>
      <Routes>
        <Route path="/" element={
          <div className='product_list'>
            {products.map((product, index) => (
              <ProductList key={index} product={product} />
            ))}
          </div>
        } />
        <Route path="/detail/:id" element={<DetailProduct products={products} />} />
      </Routes>
    </>
  );
};

export default ProductAPI;