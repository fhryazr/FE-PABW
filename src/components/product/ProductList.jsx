import Product from './Product';
import { useEffect, useState, useCallback } from 'react';
import { getAllProducts } from '../../api/product';

function ProductList() {
  const [productList, setProductList] = useState()

  const fetchAllProducts = useCallback(async () => {
    const allProducts = await getAllProducts()
    setProductList(allProducts)
}, []);

  useEffect(() => {
    fetchAllProducts();
  }, [fetchAllProducts])

  // console.log(productList);

  return (
    <div className="grid px-2 grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2">
      {productList ? (
        productList.map((product) => (
            <Product key={product.id_product} id={product.id_product} name={product.namaProduk} description={product.statusProduk} price={product.hargaProduk} images={product.imagesProduct[0]} />
        ))
    ) : (
        <p>Tidak ada produk</p>
    )}
    </div>
  );
}

export default ProductList;
