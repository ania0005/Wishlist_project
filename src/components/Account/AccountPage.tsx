import React, { useState, useEffect, Fragment } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './AccountPage.css';
import { GoTrash } from "react-icons/go";

const AccountPage = () => {
  const [username, setUsername] = useState('');
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
          setUsername(data.firstName);
          
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []);

  const handleDeleteClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleDeleteAccount = () => {
    fetch('/api/users/auth/me', {
      method: 'DELETE',
    })
    .then(response => {
      if (response.ok) {
        document.cookie = 'authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        localStorage.removeItem('authToken'); 
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
  };

  return (
    <Fragment>
      <div className="dashboard">
        <header className="dashboard-header">
          <div className="user-profile">
            <div className="user-icon"></div>
            <div className="username">{username}</div>
            <div className="wishlist-section">
              <span className="my-wishlists">My WishLists</span>
              <Link to="/createWishList" className="create-wishlist-button">Create WishList</Link>
              <button onClick={handleDeleteClick} className="delete-button"><GoTrash /> delete </button>
            </div>
          </div>
        </header>
        <main className="dashboard-content">
          {/* Content here */}
        </main>
      </div>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-button" onClick={handleCloseModal}>×</span>
            <p>Do you want to delete your account?</p>
            <button onClick={handleDeleteAccount} className="delete-account-button">Delete Account</button>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default AccountPage;
