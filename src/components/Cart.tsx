import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Minus, Plus, Trash2, CreditCard, Loader } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { useAuthStore } from '../store/authStore';
import { useNavigate } from 'react-router-dom';

export const Cart: React.FC = () => {
  // const { items, removeItem, updateQuantity, subtotal, shipping, tax, total, clearCart } = useCartStore();
  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const subtotal = useCartStore((state) => state.subtotal);
  const shipping = useCartStore((state) => state.shipping);
  const tax = useCartStore((state) => state.tax);
  const total = useCartStore((state) => state.total);
  const clearCart = useCartStore((state) => state.clearCart);
  console.log(items)
  const { isAuthenticated } = useAuthStore();
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  const handleCheckout = async () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: '/cart' } });
      return;
    }

    setIsProcessing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    clearCart();
    setIsProcessing(false);
    navigate('/checkout-success');
  };

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h2 className="text-2xl font-serif font-bold text-primary-800 mb-4">Your cart is empty</h2>
          <p className="text-gray-600">Start adding some books to your cart!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 className="text-3xl font-serif font-bold text-primary-800 mb-8">Shopping Cart</h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-white p-4 rounded-lg shadow-md"
            >
              <div className="flex gap-4">
                <img
                  src={item.cover}
                  alt={item.title}
                  className="w-24 h-32 object-cover rounded"
                />
                <div className="flex-1">
                  <h3 className="font-serif font-medium text-lg">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.author}</p>
                  <p className="text-primary-800 font-medium mt-2">{item.price}</p>
                  <div className="flex items-center gap-4 mt-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1 rounded-full hover:bg-gray-100"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 rounded-full hover:bg-gray-100"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-red-500 hover:text-red-600"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                  <p className="text-sm text-primary-800 mt-2">
                    Subtotal: ${(parseFloat(item.price.replace('$', '')) * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-serif font-bold mb-4">Order Summary</h3>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                {shipping === 0 ? (
                  <span className="text-green-600">Free</span>
                ) : (
                  <span>${shipping.toFixed(2)}</span>
                )}
              </div>
              <div className="flex justify-between">
                <span>Tax (8%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="border-t pt-2 mt-2">
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
            <button
              onClick={handleCheckout}
              disabled={isProcessing}
              className="btn btn-primary w-full flex items-center justify-center gap-2"
            >
              {isProcessing ? (
                <>
                  <Loader className="h-5 w-5 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <CreditCard className="h-5 w-5" />
                  {isAuthenticated ? 'Proceed to Checkout' : 'Sign in to Checkout'}
                </>
              )}
            </button>
            {shipping > 0 && (
              <p className="text-sm text-gray-600 mt-2 text-center">
                Free shipping on orders over $50!
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
