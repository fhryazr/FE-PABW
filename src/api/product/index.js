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
