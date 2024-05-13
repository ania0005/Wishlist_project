import React, { useState, useEffect, Fragment } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './WishListPage.css';
import { GoPencil } from "react-icons/go";

import { IoLogOutOutline } from "react-icons/io5";

const WishListPage: React.FC = () => {
  const [username, setUsername] = useState('firstName');
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/api/users/auth/me')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json(); 
      })
      .then(data => {
        if (data) {
          setUsername(data.userName); 
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []);

  const handleEditClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleLogout = () => { 
    navigate('/'); 
  };

  const handleDeleteAccount = () => {
    const confirmDelete = window.confirm('Are you sure you want to delete your account? This action cannot be undone.');
    if (confirmDelete) {
      fetch('/api/users/auth/me', {
        method: 'DELETE',
      })
      .then(response => {
        if (response.ok) {
          document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
          localStorage.removeItem('token'); 
          sessionStorage.clear(); 
          console.log('Account successfully deleted.');
          navigate('/'); 
        } else {
          console.error('Failed to delete account.');
        }
      })
      .catch(error => {
        console.error('Error deleting account:', error);
      });
    }
  };
  

  return (
    <Fragment>
      <div className="dashboard">
        <header className="dashboard-header">
          <div className="user-profile">
            <div className="user-icon"></div>
            <div className="username">{username}</div>
            <div className="wishlist-section">
              <span className="my-wishlists">My WishList:</span>
              <Link to="/createWishList" className="create-wishlist-button">Create WishList</Link>
              <button onClick={handleEditClick} className="edit-button"><GoPencil /> edit </button>
              <button onClick={handleLogout} className="logout-button"><IoLogOutOutline /> Log out</button> {/* Кнопка выхода из системы */}
            </div>
          </div>
        </header>
        <main className="dashboard-content">
          
        </main>
      </div>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-button" onClick={handleCloseModal}>×</span>
            <p>Do you want to delete or edit your account?</p>
            <button onClick={handleDeleteAccount} className="delete-account-button">Delete Account</button>
          </div>
        </div>
      )}
    </Fragment>
  );
};
export default WishListPage;