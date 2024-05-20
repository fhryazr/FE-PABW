import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { BsPencilSquare, BsTruck, BsCheckCircle, BsClockHistory, BsSave, BsArrowReturnLeft } from 'react-icons/bs';
import Cookies from 'js-cookie';

function Order({ orderDate, jumlahBarang, total_harga, status, product, id_detailPesanan }) {
  const [isEditing, setIsEditing] = useState(false);
  const [currentStatus, setCurrentStatus] = useState(status);
  const [marginStyle, setMarginStyle] = useState({ marginLeft: '-12rem', marginRight: '25rem' });
  // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImZ1bGxuYW1lIjoiZ2FtZXIiLCJyb2xlIjoiS1VSSVIiLCJpYXQiOjE3MTYxNzg3OTMsImV4cCI6MTcxNjE4OTU5M30._QckkfPNai3fw_nfIMWPthkUvmxjVJ1gG5H29PBYWaY';
  const token = Cookies.get('token')

  const handleStatusChange = (newStatus) => {
    setCurrentStatus(newStatus);
    console.log('id_detailPesanan:', id_detailPesanan);
    console.log('newStatus:', newStatus);
  };

  const handleSave = () => {
    fetch('http://localhost:3000/order/edit', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        orderDetailId: id_detailPesanan,
        newStatus: currentStatus.toLowerCase(),
      })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log('Status updated successfully', data);
      setIsEditing(false);
      setMarginStyle({ marginLeft: '-10rem', marginRight: '20rem' });
    })
    .catch(error => {
      console.error('There was an error updating the status!', error);
    });
  };
  
  const handleEditClick = () => {
    setIsEditing(true);
    setMarginStyle({ marginLeft: '-8rem', marginRight: '-11rem' });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('id-ID', options);
  };

  return (
    <div className="card p-4 shadow-lg md:shadow-2xl w-full" style={marginStyle}>
      <div className="flex items-center">
        <figure className="w-1/4">
          <img
            src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
            alt={product.namaProduk}
            className="w-full h-full object-cover"
          />
        </figure>
        <div className="flex flex-col w-3/4 p-4">
          <p>Order Date: {formatDate(orderDate)}</p>
          <p>Jumlah Barang: {jumlahBarang}</p>
          <p>Total Harga: {total_harga}</p>
          <p>Status: {currentStatus}</p>
          <div className="mt-2">
            <h4>Product Details:</h4>
            <p>Nama Produk: {product.namaProduk}</p>
            <p>Harga Produk: {product.hargaProduk}</p>
            <p>Stok Produk: {product.stokProduk}</p>
            <p>Status Produk: {product.statusProduk}</p>
            <p>Description: {product.description}</p>
          </div>
          <div className="card-actions mt-2">
            {isEditing ? (
              <>
                <button
                  className={`btn btn-outline text-[10px] md:text-lg ${currentStatus === 'Sedang Dikirim' ? 'bg-green-400 text-white' : ''}`}
                  onClick={() => handleStatusChange('Sedang Dikirim')}
                  style={{ paddingLeft: '19px', paddingRight: '34px' }}
                >
                  <BsTruck /> Sedang Dikirim
                </button>
                <button
                  className={`btn btn-outline text-[10px] md:text-lg ${currentStatus === 'Sampai di Tujuan' ? 'bg-blue-400 text-white' : ''}`}
                  onClick={() => handleStatusChange('Sampai di Tujuan')}
                >
                  <BsCheckCircle /> Sampai di Tujuan
                </button>
                <button
                  className={`btn btn-outline text-[10px] md:text-lg ${currentStatus === 'Dikirim Balik' ? 'bg-red-400 text-white' : ''}`}
                  onClick={() => handleStatusChange('Dikirim Balik')}
                >
                  <BsArrowReturnLeft /> Dikirim Balik
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
  orderDate: PropTypes.string.isRequired,
  jumlahBarang: PropTypes.number.isRequired,
  total_harga: PropTypes.number.isRequired,
  status: PropTypes.string.isRequired,
  product: PropTypes.shape({
    namaProduk: PropTypes.string.isRequired,
    hargaProduk: PropTypes.number.isRequired,
    stokProduk: PropTypes.number.isRequired,
    statusProduk: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
  id_detailPesanan: PropTypes.number.isRequired,
};

export default Order;
