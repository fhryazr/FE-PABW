import React from 'react';
import PropTypes from 'prop-types';
import { TableCell, TableRow } from "flowbite-react";
import { Link } from 'react-router-dom';

function Order({ id, name, price, description, imageSrc }) {
  return (
    <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
      <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
        <figure>
          <img src={imageSrc} style={{ width: 80, height: 50 }} alt={name} />
        </figure>
      </TableCell>
      <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
        {name}
      </TableCell>
      <TableCell>
        {description}
      </TableCell>
      <TableCell>{price}</TableCell>
      <TableCell>
        <Link to={`/order-detail/${id}`} className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
          Details
        </Link>
      </TableCell>
    </TableRow>
  );
}

Order.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  imageSrc: PropTypes.string.isRequired,
};

export default Order;
