import { useEffect, useState, useCallback } from "react";
import axios from "axios";
// import ModalProduct from "./ModalProduct";
import { ModalConfirmation } from "./ModalConfirmation";
import {
  HiOutlineTrash,
  HiOutlinePencilAlt,
  HiOutlineCurrencyDollar,
} from "react-icons/hi";
import Cookies from "js-cookie";
import EditProductModal from "./ModalEditProduct";

export default function ProductListAdmin() {
  const [products, setProducts] = useState([]);
  const [editProductId, setEditProductId] = useState(null);
  const [confirmDeleteProductId, setConfirmDeleteProductId] = useState(null);
  const token = Cookies.get("token");

  const fetchProducts = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:3000/products", {
        headers: { Authorization: "Bearer " + token },
      });
      setProducts(response.data.data);
    } catch (error) {
      console.error("Failed to fetch products: ", error);
    }
  }, [token]);

  console.log(products);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleDelete = async (productId) => {
    try {
      await axios.delete(`http://localhost:3000/products/${productId}`, {
        headers: { Authorization: "Bearer " + token },
      });
      fetchProducts();
      setConfirmDeleteProductId(null);
      console.log("Product deleted successfully");
    } catch (error) {
      console.error("Failed to delete product: ", error);
    }
  };

  const handleSaveEdit = async (editedProduct) => {
    try {
      await axios.patch(
        `http://localhost:3000/products/${editProductId}`,
        editedProduct,
        {
          headers: { Authorization: "Bearer " + token },
        }
      );
      fetchProducts();
      setEditProductId(null);
      console.log("Product edited successfully");
    } catch (error) {
      console.error("Failed to edit product: ", error);
    }
  };

  return (
    <div>
      {confirmDeleteProductId && (
        <ModalConfirmation
          onConfirm={() => {
            handleDelete(confirmDeleteProductId);
          }}
          onCancel={() => setConfirmDeleteProductId(null)}
        />
      )}

      {editProductId && (
        <EditProductModal
          product={products.find(
            (product) => product.id_product === editProductId
          )}
          onSave={handleSaveEdit}
          onCancel={() => setEditProductId(null)}
        />
      )}

      {/* <ModalProduct fetch={fetchProducts} /> */}
      <div className="flex justify-between items-center w-full mb-2 shadow-md p-2">
        <div>Products</div>
        {/* <Button
          onClick={() => setOpenModal(true)}
          className="bg-blue-500 text-white px-4 py-1 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        >
          Add New Product
        </Button> */}
      </div>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>ID Product</th>
              <th>ID User</th>
              <th>Name</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products?.map((product) => (
              <tr key={product.id_product}>
                <td>{product.id_product}</td>
                <td>{product.id_user}</td>
                <td>
                  <div className="flex items-center gap-1">
                    <img
                      src={product.imagesProduct}
                      alt=""
                      style={{
                        height: "5rem",
                        width: "5rem",
                        objectFit: "cover",
                      }}
                    />
                    {product.namaProduk}
                  </div>
                </td>
                <td>{product.hargaProduk}</td>
                <td>{product.stokProduk}</td>
                <td>{product.description}</td>
                <td>
                  <button
                    onClick={() => setEditProductId(product.id_product)}
                    className="btn btn-sm bg-blue-500 mr-2"
                  >
                    <HiOutlinePencilAlt />
                  </button>
                  <button
                    onClick={() =>
                      setConfirmDeleteProductId(product.id_product)
                    }
                    className="btn btn-sm bg-red-500 text-white mr-2"
                  >
                    <HiOutlineTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
