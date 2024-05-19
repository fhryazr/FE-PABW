import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MyProduct from './MyProduct';
import { Table, TableBody, TableHead, TableHeadCell } from "flowbite-react";
import { getAllProductsByUserID } from '../../api/product/index'; // Import fungsi getAllProducts
import Cookies from 'js-cookie';

function MyProductList() {
  const [products, setProducts] = useState();
  const token = Cookies.get("token")

  useEffect(() => {
    async function fetchProducts() {
      try {
        const data = await getAllProductsByUserID(token); // Panggil fungsi getAllProducts untuk mengambil data dari API
        setProducts(data);
        // console.log(data)
      } catch (error) {
        console.log(error);
      }
    }
    fetchProducts();
  }, []);
  
  return (
    <div className="overflow-x-auto">
      <div className="flex justify-end m-4">
        <Link to="/add-product" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
          Add New Product
        </Link>
      </div>
      <Table hoverable>
        <TableHead>
          <TableHeadCell>Product ID</TableHeadCell>
          <TableHeadCell>Image</TableHeadCell>
          <TableHeadCell>Product Name</TableHeadCell>
          <TableHeadCell>Stock</TableHeadCell>
          <TableHeadCell>Stock Status</TableHeadCell>
          <TableHeadCell>Description</TableHeadCell>
          <TableHeadCell>Price</TableHeadCell>
          <TableHeadCell>
            <span className="sr-only">Edit</span>
          </TableHeadCell>
        </TableHead>
        <TableBody className="divide-y">
          {products?.map((product) => (
            <MyProduct
              key={product.id_product}
              id={product.id_product}
              name={product.namaProduk}
              price={product.hargaProduk}
              description={product.description}
              imageSrc={JSON.parse(product.imagesProduct)}
              stock = {product.stokProduk}
              status = {product.statusProduk}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default MyProductList;
