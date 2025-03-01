// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useParams, useNavigate } from 'react-router-dom';
// import toast, { Toaster } from 'react-hot-toast';

// const DeleteProduct = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [products, setProducts] = useState(null);
//   const [detailProduct, setDetailProduct] = useState(null);
//   const [errorMessage, setErrorMessage] = useState("");

//   useEffect(() =>{
//     if(id && products.length > 0){
//       const filterProduct = products.find(product => product._id === id);
//       setDetailProduct(filterProduct);
//     }
//   }, [id, products]); 


//   useEffect(() => {
//     axios.get(`http://localhost:5000/api/products/${id}`)
//       .then((response) => {
//         setProduct(response.data);
//       })
//       .catch((error) => {
//         setErrorMessage("Error fetching product details");
//       });
//   }, [id]);

//   const deleteProduct = async () => {
//     try {
//       await axios.delete(`http://localhost:5000/api/products/${id}`, {
//         headers: { Authorization: localStorage.getItem('token') }
//       });
//       toast.success("Product deleted successfully");
//       navigate('/');
//     } catch (err) {
//       console.error(err.response?.data?.msg || "Error deleting product");
//       toast.error("Failed to delete product");
//     }
//   };

//   if (errorMessage) {
//     return <p>{errorMessage}</p>;
//   }

//   if (!products) {
//     return <p>Loading...</p>;
//   }

//   return (
//      <div className='detail'>
//           <img src={detailProduct.images} alt={detailProduct.title} />
//           <div className='box-detail'> 
//             <div className='row'>
//               <h2>{detailProduct.title}</h2>
//               <h6>{detailProduct.product_id}</h6>
//             </div>
//             <span>${detailProduct.price}</span>
//             <p>{detailProduct.description}</p>
//             <p>{detailProduct.content}</p>
//             <p>{detailProduct.sold}</p>
//             <button onClick={deleteProduct}>Delete</button>
//             <Toaster />
//           </div>
//         </div>
//   );
// };

// export default DeleteProduct;



import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

const DeleteProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);  // ✅ Initialize as empty array
  const [detailProduct, setDetailProduct] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  // ✅ Fetch product details first
  useEffect(() => {
    console.log("Fetching product with ID:", id); // Debugging
    axios.get(`http://localhost:5000/api/products/${id}`)
      .then((response) => {
        setProducts(response.data); // ✅ Correct state update
        setDetailProduct(response.data); // ✅ Set detail product immediately
      })
      .catch(() => {
        setErrorMessage("Error fetching product details");
      });
  }, [id]);

  console.log("Detail product:", detailProduct); // Debugging
  

  // ✅ Delete product function
  const deleteProduct = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`, {
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
  if (!detailProduct) return <p>Loading...</p>; // ✅ Prevent accessing `null`

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
