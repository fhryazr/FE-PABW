import React from 'react';
import PropTypes from 'prop-types';
import { Table, TableHead, TableBody, TableRow, TableCell } from "flowbite-react";

function MyProduct({ name, price, description }) {
  return (
    <Table className="overflow-x-auto">
      <TableHead>
        <TableRow>
          <Table.HeadCell>Product Name</Table.HeadCell>
          <Table.HeadCell>Description</Table.HeadCell>
          <Table.HeadCell>Price</Table.HeadCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
            {name}
          </Table.Cell>
          <Table.Cell className="whitespace-normal text-gray-500 dark:text-gray-400">
            {description}
          </Table.Cell>
          <Table.Cell>{price}</Table.Cell>
        </TableRow>
        <TableRow>
          <Table.Cell colSpan={3} />
          <Table.Cell className="text-right">
            <a href="#" className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
              Edit
            </a>
          </Table.Cell>
        </TableRow>
      </TableBody>
    </Table>
  );
}

MyProduct.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default MyProduct;
