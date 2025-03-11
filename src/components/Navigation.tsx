import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BookOpen, Search, ShoppingCart, Sun, Moon, Menu, User, LogOut, User2 } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { useAuthStore } from '../store/authStore';

interface NavigationProps {
  isDarkMode: boolean;
  setIsDarkMode: (value: boolean) => void;
  setSearchQuery: (query: string) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ isDarkMode, setIsDarkMode, setSearchQuery }) => {
  const cartItems = useCartStore((state) => state.items);
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const { isAuthenticated, logout } = useAuthStore();
  const navigate = useNavigate();
  const [searchInputValue, setSearchInputValue] = useState('');

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchInputValue(query);
    setSearchQuery(query);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <BookOpen className="h-8 w-8 text-primary-600" />
            </Link>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search books..."
                className="px-4 py-2 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-600"
                value={searchInputValue}
                onChange={handleSearchInputChange}
              />
              <Search className="absolute top-1/2 right-3 -translate-y-1/2 h-5 w-5 text-gray-500" />
            </div>
            <Link to="/cart" className="nav-link relative">
              <ShoppingCart className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>
            {isAuthenticated ? (
              <>
                <button
                  onClick={handleLogout}
                  className="nav-link flex items-center gap-2"
                >
                  <LogOut className="h-5 w-5" />
                </button>
                <Link to="/profile" className="nav-link">
                  <User2 className="h-5 w-5" />
                </Link>
              </>
            ) : (
              <Link to="/login" className="nav-link">
                <User className="h-5 w-5" />
              </Link>
            )}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="nav-link"
            >
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
