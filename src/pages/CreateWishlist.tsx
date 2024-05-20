import React, { useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";

const CreateWishlist: React.FC = () => {
  const navigate = useNavigate();
  const [wishlistName, setWishlistName] = useState<string>("");
  const [wishlistComment, setWishlistComment] = useState<string>("");
  const [wishlistDate, setWishlistDate] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const saveWishlist = async () => {
    try {
      const response = await fetch("/api/wishlists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: wishlistName,
          description: wishlistComment,
          eventDate: wishlistDate,
        }),
      });

      if (!response.ok) {
        console.error("Failed to save wishlist");
        throw new Error("Failed to save wishlist");
      }

      console.log("Wishlist saved successfully");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSaveClick = async () => {
    if (!wishlistName.trim()) {
      setErrorMessage("Please enter a wishlist name.");
      return;
    }
    if (!wishlistDate.trim()) {
      setErrorMessage("Please enter a valid date within the range from today to the next 50 years.");
      return;
    }
    
    await saveWishlist();
    navigate("/dashboard");
  };

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;
  const currentDay = currentDate.getDate();

  const currentDateFormatted = `${currentYear}-${
    currentMonth < 10 ? "0" + currentMonth : currentMonth
  }-${currentDay < 10 ? "0" + currentDay : currentDay}`;

  // Устанавливаем максимальную дату на 50 лет вперед от текущей
  const maxDate = new Date(currentYear + 50, currentMonth - 1, currentDay); // Уменьшаем месяц на 1, так как в JavaScript месяцы начинаются с 0

  const maxYear = maxDate.getFullYear();
  const maxMonth = maxDate.getMonth() + 1;
  const maxDay = maxDate.getDate();

  const maxDateFormatted = `${maxYear}-${
    maxMonth < 10 ? "0" + maxMonth : maxMonth
  }-${maxDay < 10 ? "0" + maxDay : maxDay}`;

  const handleDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputDate = event.target.value;
    const inputDateObject = new Date(inputDate);

    if (!inputDate || inputDateObject < new Date(currentDateFormatted) || inputDateObject > new Date(maxDateFormatted)) {
      setErrorMessage(
        "Please enter a valid date within the range from today to the next 50 years."
      );
    } else {
      setErrorMessage("");
      setWishlistDate(inputDate);
    }
  };

  const handleWishlistNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setWishlistName(event.target.value);
    setErrorMessage("");
  };

  const handleWishlistCommentChange = (
    event: ChangeEvent<HTMLTextAreaElement>
  ) => {
    setWishlistComment(event.target.value);
  };

  return (
    <div className="wishlist-container">
      <div className="wishlist-card">
        <span className="back-arrow">
          <a href="/dashboard">← Back</a>
        </span>
        <h2 className="title-custom"> Create a wishlist</h2>
        <div className="input-group">
          <label className="title-1-custom" htmlFor="wishlist-name">
            Wishlist name
          </label>
          <input
            type="text"
            id="wishlist-name"
            placeholder="For example: Birthday, New Year"
            className="rounded-input-custom"
            value={wishlistName}
            onChange={handleWishlistNameChange}
          />
        </div>
        <div className="input-group">
          <label htmlFor="comment" className="title-1-custom">
            Comment
          </label>
          <textarea
            id="comment"
            placeholder="Write something to your friends. This could be a greeting, wishes for gifts or an invitation."
            className="rounded-textarea"
            onChange={handleWishlistCommentChange}
          ></textarea>
        </div>
        <div className="input-group">
          <label htmlFor="event-date" className="title-1-custom">
            Event date
          </label>
          <input
            type="date"
            id="event-date"
            className="rounded-input"
            lang="en"
            value={wishlistDate}
            onChange={handleDateChange}
          />
        </div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <div className="input-group">
          <button className="save-button-custom" onClick={handleSaveClick}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateWishlist;
