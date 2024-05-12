import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Добавлен импорт useNavigate
import './AccountPage.css';

const AccountPage: React.FC = () => {
  const [username, setUsername] = useState('Guest');
  const navigate = useNavigate(); 

  useEffect(() => {
    
    fetch('/api/users/auth/me')
    .then(response => response.json())
    .then(data => {
      setUsername(data.userName);
    })
    .catch(error => {
      console.error('Error fetching user name:', error);
    });
  }, []); 

  // Функция для обработки клика по кнопке
  const handleCreateWishlistClick = () => {
    navigate('/createWishlist'); // Программная навигация
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="user-profile">
          <div className="user-icon"></div>
          <div className="username">{username}</div>
          <div className="wishlist-section">
            <span className="my-wishlists">My WishLists</span>
         
            <Link to="/createWishList" className="create-wishlist-button">Create WishList</Link>
          
          </div>
        </div>
      </header>
      <main className="dashboard-content">
        {/* Содержимое основной части страницы */}
      </main>
    </div>
  );
};

export default AccountPage;
