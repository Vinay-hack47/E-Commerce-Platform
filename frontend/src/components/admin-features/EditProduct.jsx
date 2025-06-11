import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import "./EditProduct.css";
import toast, { Toaster } from 'react-hot-toast';

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const [product, setProduct] = useState({
    title: "",
    price: "",
    description: "",
    content: "",
    category: ""
  });

  const [imageData, setImageData] = useState({
    url: "",
    public_id: ""
  });

  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    axios.get(`https://e-commerce-platform-hbbx.onrender.com/api/products/${id}`)
      .then((response) => {
        setProduct(response.data);
        setImageData(response.data.images );
        setImagePreview(response.data.images.url);
      })
      .catch((error) => {
        console.log("Error fetching the product", error);
      });
  }, [id]);


  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }

    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', 'vinay_cloudinary');
    data.append('cloud_name', 'dwmzks75t');

    try {
      const res = await fetch('https://api.cloudinary.com/v1_1/dwmzks75t/image/upload', {
        method: 'POST',
        body: data
      });

      if (!res.ok) {
        throw new Error("Failed to upload image");
      }

      const cloudData = await res.json();
      if (!cloudData.secure_url || !cloudData.public_id) {
        throw new Error("Invalid Cloudinary response");
      }

      setImageData({ url: cloudData.secure_url, public_id: cloudData.public_id });
    } catch (err) {
      console.error(err);
      toast.error("Image upload failed! Please try again.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!imageData.url) {
        return alert("Please upload an image");
      }

      const updatedProduct = {
        ...product,
        images: imageData
      };

      await axios.put(`https://e-commerce-platform-hbbx.onrender.com/api/products/${id}`, updatedProduct, {
        headers: { Authorization: `Bearer ${token}` } 
      });
      navigate('/');
    } catch (err) {
      if (err.response && err.response.data && err.response.data.msg === 'Product already exists') {
        toast.error("Product already exists");
      } else {
        console.error("Error updating product:", err.response ? err.response.data : err.message);
      }
    }
  };

  return (
    <div className="edit_product">
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="upload-section">
          <label htmlFor="file-upload" className="custom-file-upload">
            {imagePreview
              ? <img className="image-preview" src={imagePreview} alt="img" />
              : <img src="https://cdn-icons-png.flaticon.com/128/1665/1665680.png" className="upload-icon" alt="Upload Icon" />}
          </label>
          <input
            id="file-upload"
            className='file-input'
            type="file"
            onChange={handleFileChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="product_id">Product ID</label>
          <input type="text" name="product_id" id="product_id" required value={product.product_id} onChange={handleChangeInput} />
        </div>

        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input type="text" name="title" id="title" required value={product.title} onChange={handleChangeInput} />
        </div>

        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input type="number" name="price" id="price" required value={product.price} onChange={handleChangeInput} />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea name="description" id="description" required value={product.description} onChange={handleChangeInput}></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="content">Content</label>
          <textarea name="content" id="content" required value={product.content} onChange={handleChangeInput}></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="category">Category</label>
          <input type="text" name="category" id="category" required value={product.category} onChange={handleChangeInput} />
        </div>

        <button type="submit">Update Product</button>
      </form>
      <Toaster />
    </div>
  );
};

export default EditProduct;



