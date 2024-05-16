import React, { useState, useEffect, Fragment } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './WishlistPage.css';
import { GoTrash } from "react-icons/go";
import { GoArrowLeft } from "react-icons/go";
import { FaShareAlt } from 'react-icons/fa';


const WishListPage = () => {
  const [title, setTitle] = useState('');
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {
    fetch('/api/wishlists/{wishlistId}')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json(); 
      })
      .then(data => {
        if (data) {
          setTitle(data.title);
          
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

  const handleDeleteWishList = async (id: number) => {
    try {
      const response = await fetch('/api/wishlists/id', {
        method: 'DELETE',
      headers: {accept:"*/*"}
      });
  
      if (response.ok) {
        sessionStorage.clear();                                 //???
        console.log('WishList successfully deleted.');
        navigate('/');
      } else {
        // If the deletion fails due to server error or other reasons
        throw new Error('Failed to delete WishList.');
      }
    } catch (error) {
      console.error('Error deleting WishList:', error);
    }
  };

  
  const handleShareClick = () => {
    const authToken = localStorage.getItem('authToken'); 

    fetch('/api/wishlists/{wishlistsId}/share', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${authToken}`
      }
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Failed to share WishList.');
      }
    })
    .then(data => {
      const uuid = data.uuid;
      console.log(`WishList successfully shared. UUID: ${uuid}`);
      navigate(`/wishlist-share/${uuid}`); 
    })
    .catch(error => {
      console.error('Error sharing WishList:', error);
    });
  };

  return (
    <Fragment>
      <div className="dashboard">
        <header className="dashboard-header">
          <div className="user-profile">
            <div className="title">{title}</div>
            <div className="wishlist-section">
              <span className="go-to-wishlist"><GoArrowLeft /> Go to wish lists</span>
              <Link to="/createGift" className="add-gift-button"> Add Gift</Link>
              <button onClick={handleDeleteClick} className="delete-button"><GoTrash /> </button>
              <button onClick={handleShareClick} className="share-button"><FaShareAlt /> Share WishList </button> 
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
            <p>Do you want to delete your WishList?</p>
            <button onClick={()=> handleDeleteWishList(12)} className="delete-wishlist-button">Delete WishList</button>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default WishListPage;


