import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export const CheckoutSuccess: React.FC = () => {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full text-center"
      >
        <div className="mb-8">
          <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
        </div>
        <h2 className="text-3xl font-serif font-bold text-primary-800 mb-4">
          Order Confirmed!
        </h2>
        <p className="text-gray-600 mb-8">
          Thank you for your purchase. Your order has been successfully processed.
        </p>
        <Link
          to="/"
          className="btn btn-primary inline-flex items-center"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Continue Shopping
        </Link>
      </motion.div>
    </div>
  );
};