import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

const DeleteProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]); 
  const [detailProduct, setDetailProduct] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    axios.get(`https://e-commerce-platform-hbbx.onrender.com/api/products/${id}`)
      .then((response) => {
        setProducts(response.data); 
        setDetailProduct(response.data); 
      })
      .catch(() => {
        setErrorMessage("Error fetching product details");
      });
  }, [id]);
  

  
  const deleteProduct = async () => {
    try {
      await axios.delete(`https://e-commerce-platform-hbbx.onrender.com/api/products/${id}`, {
        headers: { Authorization: localStorage.getItem('token') }
      });
      toast.success("Product deleted successfully");
      navigate('/');
    } catch (err) {
      console.error(err.response?.data?.msg || "Error deleting product");
      toast.error("Failed to delete product");
    }
  };

  if (errorMessage) return <p>{errorMessage}</p>;
  if (!detailProduct) return <p>Loading...</p>; 
  return (
    <div className='detail'>
      <img src={detailProduct.images.url || detailProduct.images} alt={detailProduct.title} />
      <div className='box-detail'> 
        <div className='row'>
          <h2>{detailProduct.title}</h2>
          <h6>{detailProduct.product_id}</h6>
        </div>
        <span>${detailProduct.price}</span>
        <p>{detailProduct.description}</p>
        <p>{detailProduct.content}</p>
        <p>{detailProduct.sold}</p>
        <button
  onClick={deleteProduct}
  className="mt-5 w bg-red-500 hover:bg-red-600 text-blue-400 font-bold py-2 px-4 rounded-lg shadow-md transition duration-300"
>
  Delete Product
</button>

        <Toaster />
      </div>
    </div>
  );
};

export default DeleteProduct;
