import React, { useState, ChangeEvent } from 'react'; // Импортируем ChangeEvent
import { useNavigate } from 'react-router-dom';

const CreateWishlist: React.FC = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleSaveClick = () => {
    navigate("/dashboard");
  };
  
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;
  const currentDay = currentDate.getDate();
  
  // текущая дату в формате YYYY-MM-DD
  const currentDateFormatted = `${currentYear}-${currentMonth < 10 ? '0' + currentMonth : currentMonth}-${currentDay < 10 ? '0' + currentDay : currentDay}`;
  
  // Устанавливаем максимальную дату на 50 лет вперед от текущей
  const maxDate = new Date(currentYear + 50, currentMonth - 1, currentDay); // Уменьшаем месяц на 1, так как в JavaScript месяцы начинаются с 0
  
  const maxYear = maxDate.getFullYear();
  const maxMonth = maxDate.getMonth() + 1;
  const maxDay = maxDate.getDate();
  
  const maxDateFormatted = `${maxYear}-${maxMonth < 10 ? '0' + maxMonth : maxMonth}-${maxDay < 10 ? '0' + maxDay : maxDay}`;
  
  // текущая дата и максимальная дата на 50 лет вперед в формате YYYY-MM-DD
  
  const handleDateChange = (event: ChangeEvent<HTMLInputElement>) => { // Явно указываем тип параметра как ChangeEvent<HTMLInputElement>
    const inputDate = event.target.value;
  
    if (inputDate < currentDateFormatted || inputDate > maxDateFormatted) {
      setErrorMessage("Please enter a valid date within the range from today to the next 50 years.");
    } else {
      setErrorMessage("");
    }
  };
  return (
    <div className="wishlist-container">
      <div className="wishlist-card">
        <span className="back-arrow"><a href="/">&#8592; Back</a></span>
        <h2 className="title-custom"> Create a wishlist</h2>

        <div className="input-group">
          <label className="title-1-custom" htmlFor="wishlist-name">Wishlist name</label>
          <input
            type="text"
            id="wishlist-name"
            placeholder="For example: Birthday, New Year"
            className="rounded-input-custom"
          />
        </div>
        <div className="input-group">
          <label htmlFor="comment" className="title-1-custom">Comment</label>
          <textarea
            id="comment"
            placeholder="Write something to your friends. This could be a greeting, wishes for gifts or an invitation."
            className="rounded-textarea"
          ></textarea>
        </div>
        <div className="input-group">
          <label htmlFor="event-date" className="title-1-custom">Event date</label>
          <input
            type="date"
            id="event-date"
            className="rounded-input"
            lang="en"
            onChange={handleDateChange} // Добавляем обработчик изменения даты
          />
        </div>
        {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Отображаем сообщение об ошибке */}
        <div className="input-group">
          <button className="save-button-custom" onClick={handleSaveClick}>Save</button>
        </div>
      </div>
    </div>
  );
};

export default CreateWishlist;