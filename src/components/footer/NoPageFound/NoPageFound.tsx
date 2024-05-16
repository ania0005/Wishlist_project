import React from 'react';
import './styles.css'; // Подключаем стили

const NoPageFound: React.FC = () => {
  return (
    <div className="no-page-found">
      <h2>Page not found</h2>
      <p>
        We're sorry, the page you requested cannot be found. Below are some links that may be useful:
      </p>
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/login">Create a Wishlist</a></li>
        <li><a href="/about">About us</a></li>
      </ul>
    </div>
  );
};

export default NoPageFound;