import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProductById } from "../../api/product";
import { addToCart } from "../../api/cart";
import { BsCartPlus } from "react-icons/bs";
import { HiArrowSmLeft } from "react-icons/hi";
import useCartStore from "../../store/cartStore";
import Cookies from "js-cookie";

const ProductDetail = () => {
  const { id_product } = useParams(); // Mendapatkan parameter dari URL
  const [product, setProduct] = useState(null);
  const { setCartList } = useCartStore();
  const token = Cookies.get("token");
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // Kembali ke halaman sebelumnya
  };

  useEffect(() => {
    const fetchProduct = async () => {
      const detailProduct = await getProductById(id_product);
      setProduct(detailProduct);
    };
    fetchProduct();
  }, [id_product]);

  function formatPrice(price) {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  }

  const addProductToCart = async () => {
    try {
      await addToCart(product.id_product, 1, token); // Mengirim id produk, quantity (dalam contoh ini, 1), dan token
      const simplifiedCart = {
        id: product.id_product,
        name: product.namaProduk,
        price: product.hargaProduk,
        images: product.imagesProduct,
        quantity: 1,
        isSelected: false,
      };
      setCartList(simplifiedCart);
      console.log("Product added to cart successfully!");
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };

  console.log(product);
  return (
    <div className="container mx-auto p-4">
      {product ? (
        <>
          <div className="flex justify-center gap-5">
            <div className="bg-blue-200">
              {product.imagesProduct && product.imagesProduct.length > 0 && (
                <img
                  src={product.imagesProduct[0]}
                  alt={product.namaProduk}
                  className="h-[500px] w-[500px] rounded-md object-cover"
                />
              )}
            </div>
            <div className="text-pretty w-[40%] p-4">
              <h2 className="text-2xl font-semibold mb-2 overflow-hidden truncate">
                {product.namaProduk}
              </h2>
              <p className="text-xl mb-2">{formatPrice(product.hargaProduk)}</p>
              <p className="text-md mb-2">Stok Produk : {product.stokProduk}</p>
              <div className="h-[15rem] text-justify text-pretty mb-2">
                <p className="h-full overflow-y-auto text-gray-700 ">
                  {product.description || "Tidak ada deskripsi produk"}
                </p>
              </div>
              <div className="flex flex-col gap-4">
                <button
                  className="w-full btn btn-outline hover:bg-gray-200 hover:text-black text-sm font-normal"
                  onClick={addProductToCart}>
                  <BsCartPlus size={"1.2rem"} /> Add To Cart
                </button>
                <button className="w-full btn btn-neutral hover:bg-black text-sm font-normal">
                  Buy Now
                </button>
              </div>
            </div>
          </div>
          <div className="w-fit items-center gap-2 mt-10">
            <button onClick={handleGoBack} className="flex">
              <span>
                <HiArrowSmLeft className="text-[1.5rem]" />
              </span>
              back to shopping
            </button>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ProductDetail;
