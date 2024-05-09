import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateWishlist: React.FC = () => {
  const navigate = useNavigate();
  const [imageUrl, setImageUrl] = useState<string>("");

  const handleSaveClick = () => {
    navigate("/wishlist");
  };

  const handleImageUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImageUrl(event.target.value);
  };

  return (
    <div className="wishlist-container-custom">
      <div className="wishlist-card-custom">
        <span className="back-arrow-custom">
          <a href="/">&#8592; Back</a>
        </span>
        <h2 className="title-custom">Add a gift</h2>

        <div className="link-input-custom">
          <label className="title-1-custom" htmlFor="gift-link-custom">
            Link where you can buy a gift
          </label>
          <input
            type="text"
            id="gift-link-custom"
            placeholder="For example"
            className="rounded-input-custom"
          />
        </div>

        <div className="input-group-1">
          <div className="input-group-custom">
            <div className="image-input-custom">
              <label className="title-1-custom" htmlFor="gift-image-custom">
                Image
              </label>
              <input
                type="text"
                id="gift-image-custom"
                placeholder="Image / Click to download"
                className="rounded-input-custom"
                onChange={handleImageUrlChange}
              />
            </div>
          </div>

          <div className="input-group-custom">
            <label className="title-1-custom" htmlFor="gift-name-custom">
              Name
            </label>
            <input
              type="text"
              id="gift-name-custom"
              placeholder="For example"
              className="rounded-input-custom"
            />
          </div>

          <div className="input-group-custom">
            <label className="title-1-custom" htmlFor="gift-price-custom">
              Price
            </label>
            <div className="currency-input">
              <input
                type="text"
                id="gift-price-custom"
                className="rounded-input-custom"
              />
              <select className="currency-select">
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
              </select>
            </div>
          </div>
        </div>
        <div className="input-group-custom">
          <label className="title-1-custom" htmlFor="link-custom">
            Image Link
          </label>
          <input
            type="text"
            id="link-custom"
            placeholder="Enter link"
            className="rounded-input-custom"
          />
        </div>

        <div className="input-group-custom">
          <label className="title-1-custom" htmlFor="gift-comment-custom">
            Comment on the gift
          </label>
          <textarea
            id="gift-comment-custom"
            placeholder="Write something about the gift..."
            className="rounded-textarea-custom"
          ></textarea>
        </div>

        <div className="input-group-custom">
          <button className="save-button-custom" onClick={handleSaveClick}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateWishlist;
