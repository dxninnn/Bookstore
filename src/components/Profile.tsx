import React from 'react';
import profileData from '../data/profile.json';
import { motion } from 'framer-motion';

const OrderItem = ({ item }: { item: any }) => (
  <div className="border-b border-gray-200 py-2">
    <p className="font-medium">{item.title}</p>
    <p className="text-gray-600 text-sm">
      {item.author} - {item.price} x {item.quantity}
    </p>
  </div>
);

const Order = ({ order }: { order: any }) => (
  <motion.div 
    className="bg-white rounded-lg shadow-md p-4 mb-4"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <h3 className="text-lg font-medium mb-2">Order #{order.id} - {order.date}</h3>
    <div>
      {order.items.map((item: any) => (
        <OrderItem key={item.id} item={item} />
      ))}
    </div>
    <p className="font-medium mt-2">Total: {order.total}</p>
  </motion.div>
);

export const Profile = () => {
  const { user, orders } = profileData;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-3xl font-serif font-bold text-primary-800 mb-8">My Profile</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <motion.div 
          className="bg-white rounded-lg shadow-md p-4"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <img src={user.profilePicture} alt={user.name} className="w-32 h-32 rounded-full mx-auto mb-4" />
          <h2 className="text-2xl font-medium text-center">{user.name}</h2>
          <p className="text-gray-600 text-center">{user.email}</p>
        </motion.div>

        <div className="md:col-span-2">
          <h2 className="text-2xl font-medium mb-4">Order History</h2>
          {orders.length > 0 ? (
            orders.map((order) => <Order key={order.id} order={order} />)
          ) : (
            <p>No orders found.</p>
          )}
        </div>
      </div>
    </div>
  );
};
