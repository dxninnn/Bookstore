import React, { useState } from 'react';
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookMarked, TrendingUp, BookHeart } from 'lucide-react';
import { Navigation } from './components/Navigation';
import { BookDetails } from './components/BookDetails';
import { Cart } from './components/Cart';
import { Login } from './components/Login';
import { Signup } from './components/Signup';
import { CheckoutSuccess } from './components/CheckoutSuccess';
import { Profile } from './components/Profile';
import { useCartStore } from './store/cartStore';
import { useAuthStore } from './store/authStore';

const FeaturedBook = ({ id, cover, title, author, price }: { id: string; cover: string; title: string; author: string; price: string }) => {
  const addItem = useCartStore((state) => state.addItem);

  return (
    <motion.div 
      className="book-card p-4"
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Link to={`/book/${id}`}>
        <div className="relative aspect-[2/3] mb-4 book-hover-effect">
          <img src={cover} alt={title} className="rounded-lg object-cover w-full h-full shadow-lg" />
        </div>
        <h3 className="font-serif font-medium text-lg">{title}</h3>
        <p className="text-gray-600 text-sm">{author}</p>
      </Link>
      <div className="flex justify-between items-center mt-2">
        <span className="font-medium text-primary-800">{price}</span>
        <button 
          onClick={(e) => {
            e.preventDefault();
            addItem({ id, cover, title, author, price });
          }}
          className="btn-secondary px-3 py-1 text-sm"
        >
          Add to Cart
        </button>
      </div>
    </motion.div>
  );
};

interface HomePageProps {
  searchQuery: string;
}

const HomePage: React.FC<HomePageProps> = ({ searchQuery }) => {
  const featuredBooks = [
    {
      id: '1',
      cover: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=800',
      title: 'The Silent Echo',
      author: 'Alexandra Rivers',
      price: '$24.99',
    },
    {
      id: '2',
      cover: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=800',
      title: 'Midnight Gardens',
      author: 'James Mitchell',
      price: '$19.99',
    },
    {
      id: '3',
      cover: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=800',
      title: 'The Lost Library',
      author: 'Sarah Chen',
      price: '$21.99',
    },
    {
      id: '4',
      cover: 'https://images.unsplash.com/photo-1589998059171-988d887df646?auto=format&fit=crop&q=80&w=800',
      title: 'Wanderlust',
      author: 'Michael Torres',
      price: '$18.99',
    },
  ];

  const filteredBooks = featuredBooks.filter((book) =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      {/* Hero Section */}
      <section className="hero-gradient py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-primary-800 mb-6">
              Discover Your Next Great Read
            </h1>
            <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
              Explore thousands of books from contemporary bestsellers to timeless classics.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Books */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-serif font-bold text-primary-800">Featured Books</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {filteredBooks.map((book) => (
              <FeaturedBook
                key={book.id}
                id={book.id}
                cover={book.cover}
                title={book.title}
                author={book.author}
                price={book.price}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

function App() {
  const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

    if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
  };

  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-book-100 text-gray-900'}`}>
      <Navigation
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        setSearchQuery={setSearchQuery}
      />
      <Routes>
        <Route path="/" element={<HomePage searchQuery={searchQuery} />} />
        <Route path="/book/:id" element={<BookDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/checkout-success" element={<CheckoutSuccess />} />
         <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
