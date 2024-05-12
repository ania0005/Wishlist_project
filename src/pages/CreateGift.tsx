import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

const CreateGift: React.FC = () => {
  const navigate = useNavigate();
  const [imageUrl, setImageUrl] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null); // Создаем ссылку на элемент input для загрузки файла

  const handleSaveClick = () => {
    navigate("/wishlist");
  };

  // Обработчик загрузки изображения из файла
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; // Получаем файл из события
    if (file) {
      const reader = new FileReader(); // Создаем объект для чтения файла
      reader.onload = (event) => { // Обработчик события загрузки файла
        if (event.target && event.target.result) {
          setImageUrl(event.target.result as string); // Устанавливаем URL изображения в состояние
        }
      };
      reader.readAsDataURL(file); // Читаем файл как Data URL
    }
  };

  // Обработчик открытия диалога выбора файла при клике на квадрат
  const handleChooseFile = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Вызываем клик на элементе input для выбора файла
    }
  };

  // Обработчик изменения ссылки на изображение
  const handleImageLinkChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const link = event.target.value;
    setImageUrl(link); // Устанавливаем ссылку на изображение в состояние
  };

  return (
    <div className="wishlist-container-custom">
      <div className="wishlist-card-custom">
        <span className="back-arrow-custom">
          <a href="/wishlist">&#8592; Back</a>
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
          <div className="right-column">
            <div className="image-input-custom" onClick={handleChooseFile}>
              <div className="file-input-text">
                {imageUrl ? ( // Если есть URL изображения, отображаем изображение
                  <img src={imageUrl} alt="Uploaded" />
                ) : (
                  "Image / Click to upload" // Иначе показываем текст для загрузки файла
                )}
              </div>
              <input
                type="file"
                id="gift-image-custom"
                className="file-input-custom"
                onChange={handleImageUpload}
                ref={fileInputRef} // Привязываем ссылку на элемент input
                style={{ display: 'none' }} // Скрыть элемент input
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
                onChange={handleImageLinkChange} // Обработчик изменения ссылки на изображение
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
          </div>
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

export default CreateGift;