# Project Brief

**Project Name:** Bookstore
The Online Bookstore Application is a comprehensive e-commerce platform designed to provide users with a seamless experience for discovering, purchasing, and reading books across various formats—physical books, eBooks, and audiobooks.

This application will cater to book lovers, authors, and publishers, ensuring a feature-rich, user-friendly marketplace where users can browse, buy, review, and engage with a vast collection of books. The platform will also support author listings, digital book access, community features, and secure transactions.



**Goal:** Develop a web application for browsing and purchasing books online.

-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  profile_picture VARCHAR(255)
);

-- Books table
CREATE TABLE books (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  author VARCHAR(255) NOT NULL,
  cover VARCHAR(255),
  price NUMERIC NOT NULL
);

-- Orders table
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  date DATE NOT NULL,
  total NUMERIC NOT NULL
);

-- Order Items table
CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES orders(id),
  book_id UUID REFERENCES books(id),
  quantity INTEGER NOT NULL
);

-- Cart Items table
CREATE TABLE cart_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  book_id UUID REFERENCES books(id),
  quantity INTEGER NOT NULL
);