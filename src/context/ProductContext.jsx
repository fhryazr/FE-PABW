// import React, { createContext, useContext, useState, useEffect } from 'react';
// import axios from 'axios';

// // Create a context for products
// const ProductContext = createContext();

// // Provider component to wrap the application or parts of it
// const ProductProvider = ({ children }) => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     console.log('Fetching products...');
//     fetchProducts();
//   }, []);
  
//   const fetchProducts = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.get('http://localhost:3000/products');
//       console.log('Products fetched:', response.data.data);
//       setProducts(response.data.data);
//     } catch (error) {
//       console.error('Error fetching products:', error);
//       setError(error);
//     } finally {
//       setLoading(false);
//     }
//   };
  

//   // Add a new product
//   const addProduct = async (product) => {
//     setLoading(true);
//     try {
//       const response = await axios.post('http://localhost:3000/products', product);
//       setProducts([...products, response.data.data]);
//     } catch (error) {
//       setError(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Edit an existing product
//   const editProduct = async (id, updatedProduct) => {
//     setLoading(true);
//     try {
//       const response = await axios.put(`http://localhost:3000/products/${id}`, updatedProduct);
//       setProducts(products.map(product => (product.id === id ? response.data.data : product)));
//     } catch (error) {
//       setError(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Delete a product
//   const deleteProduct = async (id) => {
//     setLoading(true);
//     try {
//       await axios.delete(`http://localhost:3000/products/${id}`);
//       setProducts(products.filter(product => product.id !== id));
//     } catch (error) {
//       setError(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <ProductContext.Provider value={{ products, loading, error, fetchProducts, addProduct, editProduct, deleteProduct }}>
//       {children}
//     </ProductContext.Provider>
//   );
// };

// // Custom hook to use the ProductContext
// export const useProductContext = () => {
//   return useContext(ProductContext);
// };


// export { ProductProvider, ProductContext };