import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Share2, BookOpen, Star, ShoppingCart } from 'lucide-react';
import { useCartStore } from '../store/cartStore';

export const BookDetails: React.FC = () => {
  const { id } = useParams();
  const addItem = useCartStore((state) => state.addItem);
  
  // Mock data - in a real app, this would come from an API
  const book = {
    id,
    title: "The Silent Echo",
    author: "Alexandra Rivers",
    cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=800",
    price: "$24.99",
    rating: 4.5,
    description: "In this spellbinding novel, Alexandra Rivers weaves a tale of mystery and intrigue that will keep you guessing until the very last page. When a series of unexplained events begins to unfold in a small coastal town, local librarian Emma Carter finds herself drawn into a web of secrets that spans generations.",
    pages: 384,
    published: "2024",
    publisher: "Riverside Press",
    isbn: "978-3-16-148410-0",
    genre: ["Mystery", "Thriller", "Contemporary Fiction"]
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-12"
      >
        {/* Book Cover */}
        <div className="relative">
          <motion.div 
            className="aspect-[2/3] rounded-lg overflow-hidden shadow-2xl"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <img 
              src={book.cover} 
              alt={book.title}
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>

        {/* Book Information */}
        <div className="space-y-6">
          <div>
            <h1 className="text-4xl font-serif font-bold text-primary-800 mb-2">
              {book.title}
            </h1>
            <p className="text-xl text-gray-600">by {book.author}</p>
          </div>

          {/* Rating and Actions */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${
                    i < Math.floor(book.rating)
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                  }`}
                />
              ))}
              <span className="ml-2 text-gray-600">{book.rating}</span>
            </div>
            <button className="nav-link">
              <Heart className="h-5 w-5" />
            </button>
            <button className="nav-link">
              <Share2 className="h-5 w-5" />
            </button>
          </div>

          {/* Description */}
          <p className="text-gray-700 leading-relaxed">
            {book.description}
          </p>

          {/* Book Details */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-600">Pages:</span> {book.pages}
            </div>
            <div>
              <span className="text-gray-600">Published:</span> {book.published}
            </div>
            <div>
              <span className="text-gray-600">Publisher:</span> {book.publisher}
            </div>
            <div>
              <span className="text-gray-600">ISBN:</span> {book.isbn}
            </div>
          </div>

          {/* Genre Tags */}
          <div className="flex flex-wrap gap-2">
            {book.genre.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Purchase Options */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-3xl font-bold text-primary-800">{book.price}</span>
              <div className="flex space-x-4">
                <button 
                  onClick={() => addItem({ id: book.id!, title: book.title, author: book.author, cover: book.cover, price: book.price })}
                  className="btn btn-primary flex items-center"
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Add to Cart
                </button>
                <button className="btn btn-secondary flex items-center">
                  <BookOpen className="h-5 w-5 mr-2" />
                  Preview
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};