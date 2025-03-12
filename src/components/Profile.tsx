import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../utils/supabaseClient';
import { useAuthStore } from '../store/authStore';






const OrderItem = ({ item }: { item: any }) => {
  const [bookName, setBookName] = useState<string>('');

  useEffect(() => {
    const fetchBookName = async () => {
      const { data, error } = await supabase
        .from('books')
        .select('title')
        .eq('id', item.book_id)
        .single();

      if (error) {
        console.error("Error fetching book name:", error);
        setBookName(`Book ID: ${item.book_id}`);
      } else {
        setBookName(data.title);
      }
    };

    fetchBookName();
  }, [item.book_id]);

  return (
    <div className="border-b border-gray-200 py-2">
      <p className="font-medium">{bookName}</p>
      <p className="text-gray-600 text-sm">
        Quantity: {item.quantity}
      </p>
    </div>
  );
};

const Order = ({ order }: { order: any }) => (
  <motion.div 
    className="bg-white rounded-lg shadow-md p-4 mb-4"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <h3 className="text-lg font-medium mb-2">Order #{order.id} - {new Date(order.date).toLocaleDateString()}</h3>
    <div>
      {order.order_items.map((item: any) => (
        <OrderItem key={item.id} item={item} />
      ))}
    </div>
    <p className="font-medium mt-2">Total: {order.total}</p>
  </motion.div>
);

export const Profile = () => {
  const { isAuthenticated } = useAuthStore();
  const [profile, setProfile] = useState<any>(null);
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    const fetchProfile = async () => {
      if (isAuthenticated) {
        const { data: { user } } = await supabase.auth.getUser();
        const userId = user?.id;

        if (userId) {
          const { data: profileData, error: profileError } = await supabase
            .from('users')
            .select('*')
            .eq('id', userId)
            .single();

          if (profileError) {
            console.error("Error fetching profile:", profileError);
          } else {
            setProfile(profileData);
          }

          const { data: ordersData, error: ordersError } = await supabase
            .from('orders')
            .select('*, order_items(*)')
            .eq('user_id', userId)

          if (ordersError) {
            console.error("Error fetching orders:", ordersError);
          } else {
            setOrders(ordersData);
          }
        }
      }
    };

    fetchProfile();
  }, [isAuthenticated]);

  if (!profile) {
    return <div className="text-center">Loading profile...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-3xl font-serif font-bold text-primary-800 mb-4">My Profile</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <motion.div
          className="bg-white rounded-lg shadow-md p-4"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <img src={profile.profile_picture} alt={profile.name} className="w-32 h-32 rounded-full mx-auto mb-4" />
          <h2 className="text-2xl font-medium text-center">{profile.name}</h2>
          <p className="text-gray-600 text-center">{profile.email}</p>
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
