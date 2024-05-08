import React from 'react';
import PropTypes from 'prop-types';
import { TableCell, TableRow } from "flowbite-react";

function Order({ name, price, description, imageSrc }) {
  return (
    <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
      <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
        <figure>
          <img src={imageSrc} style={{ width: 80, height: 50 }} />
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
        <a href="#" className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
          Details
        </a>
      </TableCell>
    </TableRow>
  );
}

Order.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default Order;
