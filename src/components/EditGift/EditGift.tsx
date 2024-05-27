import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditGift: React.FC = () => {
  const navigate = useNavigate();
  const [giftImgUrl, setGiftImgUrl] = useState<string>("");

  const [giftName, setGiftName] = useState<string>("");
  const [giftLink, setGiftLink] = useState<string>("");
  const [giftPrice, setGiftPrice] = useState<string>("");
  const [wishlistId, setWishlistId] = useState<string>("");
  const [giftComment, setGiftComment] = useState<string>("");
  const [giftIsReserved, setGiftIsReserved] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [currency, setCurrency] = useState<string>("EUR");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { id: giftId } = useParams<{ id: string }>();

  useEffect(() => {
    if (!giftId) return;

    fetch(`/api/gifts/${giftId}`)
      .then((response) => response.json())
      .then((data) => {
        setGiftImgUrl(data.imgUrl);
        setGiftName(data.title);
        setGiftLink(data.url);
        setGiftPrice(data.price.toString());
        setGiftComment(data.description);
        setCurrency(data.currency);
        setGiftIsReserved(data.reserved);
        setWishlistId(data.wishlist.id)
      })
      .catch((error) => {
        console.error("Error fetching gift data:", error);
      });
  }, [giftId]);

  const updateGift = async () => {
    if (!giftId) return;

    try {
      const giftData = {
        title: giftName,
        url: giftLink,
        price: parseFloat(giftPrice),
        description: giftComment,
        reserved: giftIsReserved,
        imgUrl: giftImgUrl,
        currency: currency,
      };

      const response = await fetch(`/api/gifts/${giftId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(giftData),
      });

      if (response.ok) {
        console.log("Gift updated successfully.");
      } else {
        setErrorMessage("Failed to update gift. Please try again.");
      }
    } catch (error) {
      console.error("Error updating gift:", error);
    }
  };

  const handleSaveClick = async () => {
    if (!giftName.trim() && !giftLink.trim()) {
      setErrorMessage("Please enter a gift name or purchase link.");
      return;
    }

    if (!giftPrice.trim()) {
      setErrorMessage("Please enter the gift price.");
      return;
    }
    if (giftComment.length > 70) {
      setErrorMessage("Comment too long. Please shorten your comment.");
      return;
    }
    if (giftName.length > 40) {
      setErrorMessage("Name too long. Please shorten name.");
      return;
    }

    await updateGift();
      navigate(`/wishlist/${wishlistId}`);
    
  };

  const handleImgUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target && event.target.result) {
          setGiftImgUrl(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChooseFile = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="wishlist-container-custom">
      <div className="wishlist-card-custom">
        <span className="back-arrow-custom">
          <a href={`/wishlist/${wishlistId}`}>&#8592; Back</a>
        </span>
        <h2 className="title-custom">Edit Gift</h2>
        <div className="link-input-custom">
          <label className="title-1-custom" htmlFor="gift-link-custom">
            Link where you can buy a gift
          </label>
          <input
            type="text"
            id="gift-link-custom"
            placeholder="For example"
            className="rounded-input-custom"
            value={giftLink}
            onChange={(e) => setGiftLink(e.target.value)}
          />
        </div>
        <div className="input-group-1">
          <div className="right-column">
            <div className="img-input-custom" onClick={handleChooseFile}>
              <div className="file-input-text">
                {giftImgUrl ? (
                  <img src={giftImgUrl} alt="Uploaded" />
                ) : (
                  "Image / Click to upload"
                )}
              </div>
              <input
                type="file"
                id="gift-img-custom"
                className="file-input-custom"
                onChange={handleImgUpload}
                ref={fileInputRef}
                style={{ display: "none" }}
              />
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
                value={giftImgUrl}
                onChange={(e) => setGiftImgUrl(e.target.value)}
              />
            </div>
          </div>
          <div className="left-column">
            <div className="input-group-custom">
              <label className="title-1-custom" htmlFor="gift-name-custom">
                Name
              </label>
              <input
                type="text"
                id="gift-name-custom"
                placeholder="For example"
                className="rounded-input-custom"
                value={giftName}
                onChange={(e) => setGiftName(e.target.value)}
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
                  value={giftPrice}
                  onChange={(e) => setGiftPrice(e.target.value)}
                />
                <select
                  className="currency-select"
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                >
                  <option value="EUR">EUR</option>
                  <option value="USD">USD</option>
                </select>
              </div>
            </div>
            <div className="input-group-custom">
              <label className="title-1-custom" htmlFor="gift-comment-custom">
                Comment
              </label>
              <textarea
                id="gift-comment-custom"
                placeholder="Write something about the gift..."
                className="rounded-textarea-custom"
                value={giftComment}
                onChange={(e) => setGiftComment(e.target.value)}
              ></textarea>
            </div>
          </div>
        </div>
        <div className="input-group-custom">
          <button className="save-button-custom" onClick={handleSaveClick}>
            Save
          </button>
        </div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
    </div>
  );
};

export default EditGift;


