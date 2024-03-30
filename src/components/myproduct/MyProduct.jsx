import { PropTypes } from "prop-types";
import { BsCartPlus } from "react-icons/bs";
import { Link } from 'react-router-dom';

function MyProduct({ name, price, description}) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      className="product-list p-2 rounded-xl bg-base-100 shadow-lg md:shadow-2xl"
      style={{ maxWidth: '90vw', margin: '0 auto' }}
    >
      <div className="flex">
        <figure className="w-1/5 mr-2">
          <img src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt={name} />
        </figure>
        <div className="flex-grow">
          <h2 className="font-bold text-xl text-pretty">{name}</h2>
          <p className="font-semibold text-lg">{price}</p>
          <div>
            {isExpanded ? (
              <p className="text-sm">{description}</p>
            ) : (
              <p className="text-sm text-gray-500">
                {description.substring(0, 30) + '...'}
                <button className="text-blue-500" onClick={() => setIsExpanded(true)}>
                  Selengkapnya
                </button>
              </p>
            )}
          </div>
          <Link to={`/detail-order/${id}`}>
            <button className="btn btn-sm ml-auto">Detail Order</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

MyProduct.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
};

export default MyProduct;
