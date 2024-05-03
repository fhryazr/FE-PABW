import MyProductList from"./MyProductList"; // Assuming MyProductList.jsx is in the same directory


function MyProductWrapper() {
  return (
    <div className="container flex flex-col items-center my-8">
      <h1 className="text-2xl text-center font-bold mb-8">Our Products</h1>
      <MyProductList />
    </div>
  );
}

export default MyProductWrapper;
