import MyProduct from './myProduct';
import React from 'react';

function MyProductList() {
  const products = [
    { id: 1, name: 'Shoes', description: 'If a dog chews shoes whose shoes does he choose?', price: 'Rp. 100.000'},
    { id: 2, name: 'Shoes', description: 'If a dog chews shoes whose shoes does he choose?', price: 'Rp. 100.000'},
    { id: 3, name: 'Shoes', description: 'If a dog chews shoes whose shoes does he choose?', price: 'Rp. 100.000'},
    { id: 4, name: 'Shoes', description: 'If a dog chews shoes whose shoes does he choose?', price: 'Rp. 100.000'},
    { id: 5, name: 'Shoes', description: 'If a dog chews shoes whose shoes does he choose?', price: 'Rp. 100.000' },
    { id: 6, name: 'Shoes', description: 'If a dog chews shoes whose shoes does he choose?', price: 'Rp. 100.000' },
    { id: 7, name: 'Shoes', description: 'If a dog chews shoes whose shoes does he choose?', price: 'Rp. 100.000' },
    { id: 8, name: 'Shoes', description: 'If a dog chews shoes whose shoes does he choose?', price: 'Rp. 100.000' },
    { id: 9, name: 'Shoes', description: 'If a dog chews shoes whose shoes does he choose?', price: 'Rp. 100.000' },
    { id: 10, name: 'Shoes', description: 'If a dog chews shoes whose shoes does he choose?', price: 'Rp. 100.000' },
    { id: 11, name: 'Shoes', description: 'If a dog chews shoes whose shoes does he choose?', price: 'Rp. 100.000' },
    { id: 12, name: 'Shoes', description: 'If a dog chews shoes whose shoes does he choose?', price: 'Rp. 100.000' },
    { id: 13, name: 'Shoes', description: 'If a dog chews shoes whose shoes does he choose?', price: 'Rp. 100.000' },
    { id: 14, name: 'Shoes', description: 'If a dog chews shoes whose shoes does he choose?', price: 'Rp. 100.000' },
    { id: 15, name: 'Shoes', description: 'If a dog chews shoes whose shoes does he choose?', price: 'Rp. 100.000' },
    { id: 16, name: 'Shoes', description: 'If a dog chews shoes whose shoes does he choose?', price: 'Rp. 100.000' },
    { id: 17, name: 'Shoes', description: 'If a dog chews shoes whose shoes does he choose?', price: 'Rp. 100.000' },
    { id: 18, name: 'Shoes', description: 'If a dog chews shoes whose shoes does he choose?', price: 'Rp. 100.000' },
    { id: 19, name: 'Shoes', description: 'If a dog chews shoes whose shoes does he choose?', price: 'Rp. 100.000' },
    { id: 20, name: 'Shoes', description: 'If a dog chews shoes whose shoes does he choose?', price: 'Rp. 100.000' },
];

  return (
    <React.Fragment>
      {products.map((order) => (
        <li key={order.id} className="list-item mb-2">
          <MyProduct name={order.name} price={order.price} description={order.description} />
        </li>
      ))}
    </React.Fragment>
  );
}

export default MyProductList;
