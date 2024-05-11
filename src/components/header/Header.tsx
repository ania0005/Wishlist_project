import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./Style.css";


const Header = () => {
  const navigate = useNavigate();

  const handleCreateWishlistClick = () => {
    navigate('/login');
  };

  return (
    <header className="header">
      <div className="header__wrapper">
        <h1 className="header__title">
          <strong>
            <em>GiftListify</em>
          </strong>
          <br />wishlist creation service
        </h1>
        <div className="header__text">
          <p>with passion for learning and creating.</p>
        </div>
        <button className="create_list_button" onClick={handleCreateWishlistClick}>
        Create a new wishlist
        </button>
      </div>
    </header>
  );
};

export default Header;