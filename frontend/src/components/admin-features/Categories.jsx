import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Categories.css'; // Import the external CSS file

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState('');
  const [editing, setEditing] = useState(false);
  const [editId, setEditId] = useState('');

  useEffect(() => {
    axios.get('https://e-commerce-platform-hbbx.onrender.com/category/category')
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.error('Error fetching categories', error);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await axios.put(`https://e-commerce-platform-hbbx.onrender.com/category/category/${editId}`, { name }, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setEditing(false);
        setEditId('');
      } else {
        await axios.post('https://e-commerce-platform-hbbx.onrender.com/category/category', { name }, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
      }
      setName('');
      fetchCategories();
    } catch (error) {
      console.error('Error saving category', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get('https://e-commerce-platform-hbbx.onrender.com/category/category');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories', error);
    }
  };

  const handleEdit = (id, name) => {
    setEditing(true);
    setEditId(id);
    setName(name);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://e-commerce-platform-hbbx.onrender.com/category/category/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      fetchCategories();
    } catch (error) {
      console.error('Error deleting category', error);
    }
  };

  return (
    <div className="categories-container">
      <h2 className="categories-title">Manage Categories</h2>

      <form onSubmit={handleSubmit} className="categories-form">
        <div className="input-group">
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Category Name"
            required
            className="category-input"
          />
          <button type="submit" className="category-button">
            {editing ? 'Update' : 'Create'}
          </button>
        </div>
      </form>

      <div className="categories-list">
        {categories.map(category => (
          <div key={category._id} className="category-item">
            <span className="category-name">{category.name}</span>
            <div className="category-actions">
              <button onClick={() => handleEdit(category._id, category.name)} className="edit-button">
                Edit
              </button>
              <button onClick={() => handleDelete(category._id)} className="delete-button">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
