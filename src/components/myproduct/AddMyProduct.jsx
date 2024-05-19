import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addProduct } from '../../api/product';
import Cookies from 'js-cookie';

function AddProduct() {
  const [product, setProduct] = useState({
    name: '',
    price: '',
    description: '',
    stock: 0,
    status: 'Stok Tersedia',
    imageFile: null,
    imageSrc: '',
  });
  const navigate = useNavigate();
  const token = Cookies.get('token');

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'stock' && parseInt(value) < 0) {
      return;
    }
    setProduct({ ...product, [name]: value });
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProduct((prevProduct) => ({
          ...prevProduct,
          imageSrc: reader.result,
          imageFile: file,
        }));
      };
      reader.readAsDataURL(file);
    } else {
      setProduct((prevProduct) => ({
        ...prevProduct,
        imageSrc: '',
        imageFile: null,
      }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('namaProduk', product.name);
    formData.append('hargaProduk', product.price);
    formData.append('stokProduk', product.stock);
    formData.append('statusProduk', product.status);
    formData.append('description', product.description);
    if (product.imageFile) {
      formData.append('imagesProduct', product.imageFile);
    }

    // Logging formData entries for debugging
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }

    try {
      await addProduct(formData, token);
      console.log('Product added successfully');
      navigate('/store');
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto my-10 p-6 bg-white shadow-md rounded">
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Product Name</label>
        <input
          type="text"
          name="name"
          value={product.name}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Price</label>
        <div className="relative">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">Rp.</span>
          <input
            type="text"
            name="price"
            value={product.price}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 pl-10 pr-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Stock</label>
        <input
          type="number"
          name="stock"
          value={product.stock}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Status</label>
        <select
          name="status"
          value={product.status}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        >
          <option value="available">Stok Tersedia</option>
          <option value="out_of_stock">Stok Kosong</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Image</label>
        <input
          type="file"
          onChange={handleImageChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          accept="image/*"
          required
        />
        {product.imageSrc && <img src={product.imageSrc} alt="Preview" className="mt-4 w-40 h-40 object-cover" />}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Description</label>
        <textarea
          name="description"
          value={product.description}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>
      <div className="flex items-center justify-between">
        <button
          type="submit"
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Add Product
        </button>
      </div>
    </form>
  );
}

export default AddProduct;
