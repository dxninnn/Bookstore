import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BookOpen, Search, ShoppingCart, Sun, Moon, Menu, User, LogOut, User2 } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { useAuthStore } from '../store/authStore';

interface NavigationProps {
  isDarkMode: boolean;
  setIsDarkMode: (value: boolean) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ isDarkMode, setIsDarkMode }) => {
  const cartItems = useCartStore((state) => state.items);
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const { isAuthenticated, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
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
            <button className="nav-link">
              <Search className="h-5 w-5" />
            </button>
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
