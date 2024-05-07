import MyProductList from"./MyProductList";

function MyProductWrapper() {
  return (
    <div className="container flex flex-col items-center my-8">
      <h1 className="text-2xl text-center font-bold mb-8">My Products</h1>
      <MyProductList />
    </div>
  );
}

export default MyProductWrapper;
