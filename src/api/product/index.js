import { data } from "autoprefixer";
import axios from "axios";

export const getProductById = async (productId) => {
  try {
    const response = await axios.get(
      `http://localhost:3000/products/${productId}`
    );
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllProducts = async () => {
  try {
    const response = await axios.get("http://localhost:3000/products");
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllProductsByUserID = async (token) => {
  try {
    const response = await axios.get("http://localhost:3000/products/me", {
      headers : {Authorization : "Bearer "+token}
    });
    
    // console.log(response.data.data);
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};

export const editProduct = async (product, token) => {
  const { id, name, price, stock, status, description } = product;
  // console.log(id); // Ensure ID is logged correctly

  try {
    const response = await axios.patch(
      `http://localhost:3000/products/${id}`, 
      {
        namaProduk: name,
        hargaProduk: price,
        stokProduk: stock,
        statusProduk: status,
        description: description
      },
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteProduct = async (productId, token) => {
  try {
    const response = await axios.delete(`http://localhost:3000/products/${productId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const addProduct = async (formData, token) => {
  try {
    const response = await axios.post("http://localhost:3000/products", formData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data.data;
  } catch (error) {
    console.log('Error in addProduct:', error.response || error.message);
    throw error; // Throw error to handle it in the component
  }
};
