import { useState } from 'react';
import PropTypes from 'prop-types';
import { BsPencilSquare, BsTruck, BsCheckCircle, BsClockHistory, BsSave } from 'react-icons/bs';

function Order({ name, price, description, address, phone, status }) {
  const [isEditing, setIsEditing] = useState(false);
  const [currentStatus, setCurrentStatus] = useState(status);
  const [marginStyle, setMarginStyle] = useState({ marginLeft: '-10rem', marginRight: '20rem' });

  const handleStatusChange = (newStatus) => {
    setCurrentStatus(newStatus);
  };

  const handleSave = () => {
    setIsEditing(false);
    setMarginStyle({ marginLeft: '-10rem', marginRight: '20rem' });
  };

  const handleEditClick = () => {
    setIsEditing(true);
    setMarginStyle({ marginLeft: '-8rem', marginRight: '-11rem' });
  };

  return (
    <div className="card p-4 shadow-lg md:shadow-2xl w-full" style={marginStyle}>
      <div className="flex items-center">
        <figure className="w-1/4">
          <img
            src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
            alt={name}
            className="w-full h-full object-cover"
          />
        </figure>
        <div className="flex flex-col w-3/4 p-4">
          <h2 className="font-bold text-[16px] text-pretty">{name}</h2>
          <p className="font-[700] text-[18px]">{price}</p>
          <p className="text-[12px] text-gray-500 text-pretty">{description}</p>
          <p className="text-[12px] text-gray-500 text-pretty">Alamat: {address}</p>
          <p className="text-[12px] text-gray-500 text-pretty">Telepon: {phone}</p>
          <p className="text-[12px] text-gray-500 text-pretty">Status: {currentStatus}</p>
          <div className="card-actions mt-2">
            {isEditing ? (
              <>
                <button
                  className={`btn btn-outline text-[10px] md:text-lg ${currentStatus === 'Menunggu' ? 'bg-yellow-400 text-white' : ''}`}
                  style={{ paddingLeft: '10px', paddingRight: '10px' }}
                  onClick={() => handleStatusChange('Menunggu')}
                >
                  <BsClockHistory /> Status Menunggu
                </button>
                <button
                  className={`btn btn-outline text-[10px] md:text-lg ${currentStatus === 'Dikirim' ? 'bg-green-400 text-white' : ''}`}
                  style={{ paddingLeft: '26px', paddingRight: '27px' }}
                  onClick={() => handleStatusChange('Dikirim')}
                >
                  <BsTruck /> Status Dikirim
                </button>
                <button
                  className={`btn btn-outline text-[10px] md:text-lg ${currentStatus === 'Diterima' ? 'bg-blue-400 text-white' : ''}`}
                  style={{ paddingLeft: '18px', paddingRight: '18px' }}
                  onClick={() => handleStatusChange('Diterima')}
                >
                  <BsCheckCircle /> Status Diterima
                </button>
                <button className="btn btn-outline text-[10px] md:text-lg" onClick={handleSave}>
                  <BsSave /> Simpan
                </button>
              </>
            ) : (
              <button className="lg:w-[40%] btn rounded-x1 text-[10px] md:text-[15px] bg-green-400 text-white hover:text-black" onClick={handleEditClick}>
                <BsPencilSquare /> Edit Status
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

Order.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
};

export default Order;
