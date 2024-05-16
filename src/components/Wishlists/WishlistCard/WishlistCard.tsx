import React from 'react';

const WishlistCard: React.FC<{ wishlistName: string; numberOfGifts: number; creationDate: string }> = ({ wishlistName, numberOfGifts, creationDate }) => {
  return (
    <div className="wishlist-card">
      <h3>{wishlistName}</h3>
      <p>Number of Gifts: {numberOfGifts}</p>
      <p>Creation Date: {creationDate}</p>
    </div>
  );
};

export default WishlistCard;