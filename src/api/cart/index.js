import axios from "axios";

export const getCart = async (token) => {
  if (token) {
    try {
      const response = await axios.get("http://localhost:3000/cart", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      console.log(error);
      // return null;
    }
  }
};

export const addToCart = async (id, quantity, token) => {
  try {
    const response = await axios.post('http://localhost:3000/cart', {
      id_product: id,
      jumlah_barang: quantity
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    // Lakukan sesuatu dengan respons, jika diperlukan
    console.log('Product added to cart:', response.data);
    return response.data; // Jika perlu untuk di-handle di komponen lain
  } catch (error) {
    console.error('Error adding product to cart:', error);
    throw error; // Lebih baik untuk menangani error di komponen yang memanggil fungsi ini
  }
};

export const removeFromCart = async (idProduct, token) => {
  try {
    const response = await axios.delete(`http://localhost:3000/cart/${idProduct}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    // Lakukan sesuatu dengan respons, jika diperlukan
    console.log('Product removed from cart:', response.data);
    return response.data; // Jika perlu untuk di-handle di komponen lain
  } catch (error) {
    console.error('Error removing product from cart:', error);
    throw error; // Lebih baik untuk menangani error di komponen yang memanggil fungsi ini
  }
};

export const updateCartItemQuantity = async (idProduct, quantity, token) => {
  try {
    const response = await axios.patch('http://localhost:3000/cart/edit', {
      id_product: idProduct,
      jumlah_barang: quantity,
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    console.log('Item Updated successfully', response)
    return response
  } catch (error) {
    console.error(error)
  }
}


