import React, { useState, useEffect } from 'react';
import { editProduct, deleteProduct } from '../../api/product';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function EditProduct() {
  const token = Cookies.get("token");
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    id: '',
    name: '',
    price: '',
    stock: '',
    status: '',
    description: ''
  });
  // console.log(id);

  useEffect(() => {
    getProductDetails();
  }, []);

  const getProductDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/products/${id}`);
      // console.log(response);
      setProduct(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "stock" && parseInt(value) < 0) {
      return;
    }
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await editProduct({ ...product, id }, token);
      console.log(product);
      navigate('/store');
    } catch (error) {
      console.log('Error editing product:', error.response ? error.response.data : error.message);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteProduct(id, token);
      navigate('/store');
    } catch (error) {
      console.log('Error deleting product:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-xl font-bold mb-4">Edit Product</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
            Product Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={product.name}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="price" className="block text-gray-700 font-bold mb-2">
            Price
          </label>
          <input
            type="text"
            name="price"
            id="price"
            value={product.price}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="stock" className="block text-gray-700 font-bold mb-2">
            Stock
          </label>
          <input
            type="number"
            name="stock"
            id="stock"
            value={product.stock}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="status" className="block text-gray-700 font-bold mb-2">
            Status
          </label>
          <select
            name="status"
            id="status"
            value={product.status}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="available">Stok Tersedia</option>
            <option value="out_of_stock">Stok Kosong</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700 font-bold mb-2">
            Description
          </label>
          <textarea
            name="description"
            id="description"
            rows="5"
            value={product.description}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div className="flex justify-between">
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-700"
          >
            Save Changes
          </button>
          <button
            type="button"
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-700"
            onClick={handleDelete}
          >
            Delete Product
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditProduct;
