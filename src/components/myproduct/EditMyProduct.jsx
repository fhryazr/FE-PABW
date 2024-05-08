import React, { useState } from 'react';

function EditProduct() {
  const [product, setProduct] = useState({
    id: 1, // Ganti dengan ID produk yang sebenarnya
    name: 'Shoes',
    description: 'If a dog chews shoes whose shoes does he choose?',
    price: 'Rp. 100.000',
    imageSrc: 'https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg',
  });

  const handleChange = (event) => {
    setProduct({ ...product, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Simpan perubahan ke penyimpanan lokal (misalnya localStorage)
    // Tampilkan pesan konfirmasi atau redirect ke halaman lain
    console.log('Produk berhasil diedit!');
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
          <img src={product.imageSrc} alt="Product Image" width={200} height={150} />
        </div>
        <div className="flex center-between"> {/* Added flexbox for button arrangement */}
          <button
            type="submit"
            className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700"
          >
            Save Changes
          </button>
          <button
            type="submit" // Assuming the Delete button also submits a form (modify if needed)
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-700"
          >
            Delete Product
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditProduct;
