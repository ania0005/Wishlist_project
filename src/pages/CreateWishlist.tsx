import React from 'react';
import { useNavigate } from 'react-router-dom';

const CreateWishlist: React.FC = () => {

const navigate = useNavigate();

const handleSaveClick = () => {
  navigate("/dashboard");
};
return (
    
    <div className="wishlist-container">
      <div className="wishlist-card">
      <span className="back-arrow"><a href="/">&#8592; Back</a></span>
        <h2 className="title"> Create a wishlist</h2>
        
        <div className="input-group">
          <label className="title-1" htmlFor="wishlist-name">Wish list name</label>
          <input
            type="text"
            id="wishlist-name"
            placeholder="For example: Birthday, New Year"
            className="rounded-input"
          />
        </div>
        <div className="input-group">
          <label htmlFor="comment" className="title-1">Comment</label>
          <textarea
            id="comment"
            placeholder="Write something to your friends. This could be a greeting, wishes for gifts or an invitation."
            className="rounded-textarea"
          ></textarea>
        </div>
        <div className="input-group">
          <label htmlFor="event-date" className="title-1">Event date</label>
          <input type="date" id="event-date" className="rounded-input" lang="en"/>
        </div>
        <div className="input-group">
        <button className="save-button" onClick={handleSaveClick}>Save</button>
        </div>
      </div>
    </div>
   
  );
};

export default CreateWishlist;