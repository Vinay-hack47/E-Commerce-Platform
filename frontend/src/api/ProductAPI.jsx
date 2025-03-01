// import React, { useEffect, useState } from 'react';
// import axios from 'axios'; // used for making HTTP requests
// import Product from '../components/mainpages/products/Product';
// import ProductList from '../components/mainpages/utils/ProductList/ProductList';
// import "../components/mainpages/utils/ProductList/ProductList.css"
// // import DetailProduct from '../components/mainpages/utils/DetailProducts/DetailProduct';


// const ProductAPI = () => {
//   const [products, setProducts] = useState([]);
//   const [errorMessage, setErrorMessage] = useState("");

//   useEffect(() => {
//     axios.get("http://localhost:5000/api/products")
//       .then((response) => {
//         setProducts(response.data);
//         //  console.log(response);
//       })
//       .catch((error) => {
//         setErrorMessage("Error fetching products");
//       });
//   }, []);


//   return (
//     <>
//       <div>
//         {errorMessage && <div className="error-message">{errorMessage}</div>}
//       </div >
//       <div className='product_list'>

//       {
//         products.map((product, index) => {
//           return (
            
//           //   <div key={index}>
//           //    <h2>{item.title}</h2>
//           //    <h6>{item.price}</h6>
//           //    <p>{item.description}</p>
//           //     <img src={item.images} alt="Product image" />
//           //  </div> 
//           <div key={index}>
//               <ProductList  product={product} />
             
//             {/* <DetailProduct product={product} /> */}
             
//           </div>

//           );
//         })
//       }

//       </div>
    
//     </>
//   );
// };

// export default ProductAPI;



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