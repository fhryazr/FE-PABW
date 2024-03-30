import MyProductList from "./MyProductList";

function MyProductWrapper() {
  return (
    <div className="container list flex-row items-center my-8">
      <h1 className="text-2xl text-center font-bold mb-8">My Product</h1>
      <ul className="list ml-6">
        <MyProductList />
      </ul>
    </div>
  );
}

export default MyProductWrapper;
