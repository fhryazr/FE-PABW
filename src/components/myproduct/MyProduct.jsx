import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'; // Import Link untuk routing
import { TableCell, TableRow } from "flowbite-react";

function MyProduct({ name, price, description, imageSrc, id }) { // Tambahkan parameter id
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
        <Link to={`/edit-product`}>Edit</Link> {/* Tambahkan link ke EditProduct */}
      </TableCell>
    </TableRow>
  );
}

MyProduct.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  imageSrc: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired, // Tambahkan propTypes untuk id
};

export default MyProduct;
