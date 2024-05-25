import Order from "./Order";
import React from 'react';
import { Table, TableBody, TableHead, TableHeadCell } from "flowbite-react";

export const orders = [
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

function OrderList() {
  return (
    <div className="overflow-x-auto">
      <Table hoverable>
        <TableHead>
          <TableHeadCell>Image</TableHeadCell>
          <TableHeadCell>Product Name</TableHeadCell>
          <TableHeadCell>Description</TableHeadCell>
          <TableHeadCell>Price</TableHeadCell>
          <TableHeadCell>
            <span className="sr-only">Details</span>
          </TableHeadCell>
        </TableHead>
        <TableBody className="divide-y">
          {orders.map((order) => (
            <Order key={order.id} id={order.id} name={order.name} price={order.price} description={order.description} imageSrc="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" />
          ))}
        </TableBody>
      </Table>
    </div>
)}

export default OrderList;
