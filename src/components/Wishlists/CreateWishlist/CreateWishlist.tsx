import React, { useState, ChangeEvent, useContext } from "react"; // Импортируем ChangeEvent
import { useNavigate } from "react-router-dom";
import AuthContext from "../../../contexts/AuthContext";

const CreateWishlist: React.FC = () => {
  const navigate = useNavigate();
  const [wishlistName, setWishlistName] = useState<string>(""); // Состояние для хранения имени вишлиста
  const [wishlistComment, setWishlistComment] = useState<string>(""); // Состояние для хранения комментария вишлиста
  const [wishlistDate, setWishlistDate] = useState<string>(""); // Состояние для хранения даты события вишлиста
  const [errorMessage, setErrorMessage] = useState<string>("");

  const { user } = useContext(AuthContext);
 
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
          user_id: user?.id,
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
    }

    await saveWishlist();
    navigate("/wishlist");
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
    // Явно указываем тип параметра как ChangeEvent<HTMLInputElement>
    const inputDate = event.target.value;

    if (inputDate < currentDateFormatted || inputDate > maxDateFormatted) {
      setErrorMessage(
        "Please enter a valid date within the range from today to the next 50 years."
      );
    } else {
      setErrorMessage("");
      setWishlistDate(inputDate); // Обновляем состояние с датой события при изменении значения поля ввода
    }
  };

  const handleWishlistNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setWishlistName(event.target.value); // Обновляем состояние с именем вишлиста при изменении значения поля ввода
    setErrorMessage(""); // Убираем сообщение об ошибке при изменении значения поля ввода
  };

  const handleWishlistCommentChange = (
    event: ChangeEvent<HTMLTextAreaElement>
  ) => {
    setWishlistComment(event.target.value); // Обновляем состояние с комментарием вишлиста при изменении значения поля ввода
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
            onChange={handleWishlistNameChange} // Добавляем обработчик изменения значения поля ввода для имени вишлиста
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
            onChange={handleWishlistCommentChange} // Добавляем обработчик изменения значения поля ввода для комментария вишлиста
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
            onChange={handleDateChange} // Добавляем обработчик изменения даты
          />
        </div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}{" "}
        {/* Отображаем сообщение об ошибке */}
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
