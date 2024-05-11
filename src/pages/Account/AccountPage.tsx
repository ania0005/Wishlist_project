
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './AccountPage.css';

const AccountPage: React.FC = () => {
  const [username, setUsername] = useState('Guest');

  useEffect(() => {
    // 
    fetch('/api/users/auth/me')
    .then(response => response.json())
    .then(data => {
      setUsername(data.userName);
    })
    .catch(error => {
      console.error('Error fetching user name:', error);
    });
  }, []); 

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="user-profile">
          <div className="user-icon"></div>
          <div className="username">{username}</div>
        </div>
        <h1 className="welcome-message">Welcome! Create your wishlist with us and share it with your friends!</h1>
        <Link to="/" className="home-button">Home</Link>
        <Link to="/createWishList" className="wishlist-button">WishList</Link>
        <Link to="/createGift" className="gift-button">Gift</Link>
        <Link to="/login" className="logout-button">Log Out</Link>
        <Link to="/createWishList" className="create-wishlist-button">Create WishList</Link>
      </header>
      <main className="dashboard-content">
        
      </main>
    </div>
  );
};

export default AccountPage;
