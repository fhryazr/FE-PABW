function Products({ products }) {
    return (
      <div className="products">
        <h2>Daftar Produk</h2>
        <ul>
          {products.map((product) => (
            <li key={product.id}>
              <Link to={`/product/${product.id}`}>
                <img src={product.image} alt={product.name} />
                <h3>{product.name}</h3>
                <p>{product.price}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  