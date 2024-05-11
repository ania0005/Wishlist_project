@import url("https://fonts.googleapis.com/css2?family=Prata&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Bonheur+Royale&family=DM+Serif+Display:ital@0;1&family=Lemon&family=Modak&family=Poller+One&family=Prata&display=swap");
@import "./reset.css"; /*Импорт файлов сброса стилей */



.section {
  padding: 0px 0px 80px;
}

body {
  display: flex;
	flex-direction: column;
  min-height: 93vh; /* Занимает всю высоту видимой области страницы */
  margin: 0;
  padding: 0;
  letter-spacing: -0.5px;
  font-size: 20px;
  font-family: "DM Serif Display", serif;
  background-color: #d6f2fd; /* Голубой цвет фона страницы */
  }
.body{
  margin-top:80px;
  height: 850px;
}
  /* -------------privacy-police------------ */

  .privacy-police-text {
    margin-top: 100px;
    margin-left: 25%;
    margin-right: 25%;
    text-align: justify;
  }

  /*------------------createWishlist---------- */
  .wishlist-container {
    background-color: whitesmoke;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    font-size: 14px;
    font-family: "DM Serif Display", serif;
  }
 
  
  .wishlist-card {
    background-color: #d1edf8;
    box-shadow: 0px 2px 4px rgba(53, 22, 22, 0.4);
    padding: 20px;
    border-radius: 15px;
    width: 800px;
    height: 800px;
  }

  .back-arrow a {
    text-decoration: none;
    color: #b1abab;
  }

  .back-arrow a:hover {
    text-decoration: underline;
  }

  .input-group {
    width: 100%;
    border-radius: 20px;
    margin-left: 20px;
    padding: 7px;
  }
  
  label {
    display: block;
    margin-bottom: 15px;
  }

  .rounded-input {
    background-color: white;
    border: none;
    border-radius: 15px;
    font-family: "DM Serif Display", serif;
    font-size: 18px;
    margin-top: 10px;

  }

  .rounded-textarea {
    background-color: white;
    border-radius: 5px;
    width: 94%;
    height: 150px;
    padding: 20px;
    font-family: "DM Serif Display", serif;
    font-size: 18px;
    margin-top: 10px;
  }

 
  .save-button:hover {
    background-color: #4294ec;
  }

  .file-input-text {
    width: 200px; /* Задайте нужную ширину */
    height: 200px; 
    justify-content: center; /* Выравнивание по горизонтали */
    align-items: center; /* Выравнивание по вертикали */
    display: flex;
    padding: 10px; 
    border-radius: 5px; 
    background-color: white; /* Белый фон */
    cursor: pointer; /* Курсор при наведении становится указателем */

  }

  /* -------------------------------------- */

  /* ------------CreateGift---------------- */

  .wishlist-container-custom {
    background-color: whitesmoke;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;

  }

  .title-custom {
    font-size: 50px;
    margin-top: 20px;
    margin-left: 20px;
  }

  .title-1-custom {
    font-size: 20px;
    font-family: "DM Serif Display", serif;
    margin: 15px auto 10px;
    width: 100%;
  }

  .wishlist-card-custom {
    background-color: #d1edf8;
    box-shadow: 0px 2px 4px rgba(53, 22, 22, 0.4);
    padding: 30px;
    border-radius: 15px;
    width: 800px;
    height: 800px;
    
  }

  .back-arrow-custom a {
    text-decoration: none;
    color: #b1abab;
  }

  .back-arrow-custom a:hover {
    text-decoration: underline;
  }

  #gift-price-custom {
    width: 75%;
    float: left;
  }

  .currency-select {
    float: left;
    margin-left: 15px; /* Добавляем небольшой отступ между полем ввода цены и выпадающим списком */
    height: 40px; /* Выравниваем высоту выпадающего списка с высотой поля ввода цены */
  }

  .currency-input {
    overflow: hidden;
  }

  .image-input-custom {
    width: 220px;
    height: 180px;
    margin-bottom: 65px;
    line-height: 40px; /* Устанавливаем высоту линии равной высоте поля ввода */
    text-align: center; /* Выравниваем текст по центру */
    border-radius: 10px;

  }
  .link-input-custom  {
    padding-left: 10px;

  }

  .link-input-custom input {
    justify-content: center;
    width: calc(100% - 30px);
    gap: 100px;
    border-radius: 10px;

  }

  #gift-name-custom {
    width: 380px; /* Устанавливаем ширину поля на 90% */
    border-radius: 10px;
  }
  #gift-link-custom {
    margin-bottom: 35px;
  }
  .rounded-input-custom {
    background-color: white;
    border: none;
    border-radius: 10px;
    height: 50px;
    font-family: "DM Serif Display", serif;
  }
  .input-group-1 {
    display: flex;
    gap: 60px;
    margin-left: 10px;
  }
  
  .rounded-input-custom::placeholder,
  .rounded-textarea-custom::placeholder,
  .file-input-text,
  .rounded-input {
    color: #8d8484; /* Устанавливаем цвет текста placeholder'а */
    border-radius: 10px;
    padding-left: 10px;
    font-size: 18px;
  }
  .rounded-textarea-custom {
    background-color: white;
    border-radius: 10px;
    width: 100%;
    height: 100px;
    padding: 10px;
    border-color: #dad7d7;
    color: #d8d7d7;
    font-family: "DM Serif Display", serif;
  }

  .save-button-custom {
    margin-top: 30px;
    margin-right: 50px;
    background-color: #007bff;
    color: #ffffff;
    font-size: 25px;
    border: none;
    border-radius: 10px;
    padding: 10px 20px;
    cursor: pointer;
    width: 200px;
    height: 50px;
    float: right;
  }

  .save-button-custom:hover {
    background-color: #4294ec;
  }
  .right-column{
    margin-top: 20px;
  }

  /*-------------------------------------------  */
  .project-instruction {
    margin: 50px auto 0 15px;
  }
  .container {
    margin: 0 auto; /* Размещение по центру */
    padding: 0 15px; /* Отступы */
    max-width: 1200px; /* Максимальная ширина */
  }

  /*------------------ Блок майн-------------------- */
  .pink-box {
    background-color: #fccbd2; /* Pink color */
    border-radius: 15px;
    padding: 40px; /* Increased padding */
    display: flex;
    flex-direction: column; /* Arrange elements in a column */
    align-items: center; /* Horizontally center the elements */
    margin: 100px auto; /* Horizontally centered */
    max-width: 1400px; /* Max width */
  }
  
  .title {
    color: black;
    margin: 5px auto;
    font-family: "Prata", serif;
    font-size: 40px;
    margin-bottom: 40px;
  }
  
  
  .columns-container {
    display: flex;
    width: 100%;
    gap: 20px; /* Add gap between columns */
  }
  
  .column {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .image-container {
    width: 100%;
    height: 100%;
    margin-bottom: 40px;
  }
  
  img {
    width: 100%;
    border-radius: 10px;
  }
  
  .white-rectangle-text {
    background-color: white;
    border-radius: 10px; /* Rounded corners */
    padding: 10px; /* Padding for text */
    margin-top: 10px; /* Margin between image and text */
    text-align: left; /* Center align text */
    font-size: 20px;
    font-family: "Prata", serif;
  
  }
  
  .bottom-white-rectangle {
    background-color: white;
    height: 100px; /* Height of bottom white rectangle */
    border-radius: 15px; /* Rounded corners */
  
  }
  
  .purple-box {
    background-color: #d1b0f0; /* Lighter purple color */
    border-radius: 15px;
    padding: 40px; /* Increased padding */
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 800px; /* Increased height */
    margin: 100px auto; /* Центрирование по горизонтали */
    max-width: 1400px; /* Максимальная ширина блока */
  }
  
  .content-left {
   width: 60%;
   margin-left: 20px;
  }
  
  .content-left h2 {
    color: black;
    margin: 5px auto;
    font-family: "Prata", serif;
    font-size: 42px;
    margin-bottom: 80px;
  }
  
  .content-left p {
      color: black;
      font-family: "Prata";
      font-size: 23px;
      margin-bottom: 40px;
  
  }
  
  .content-left button {
    background-color: #8a2be2;;
    color: white; /* Lighter purple color */
    padding: 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    width: 50%;
    margin-top: 50px;
    box-shadow: 5px 5px 7px rgba(0, 0, 0, 0.3); /* Увеличиваем тень при наведении */
    font-family: "DM Serif Display", serif;
    
  }
  
  .content-right {
    width: 50%;
    text-align: right;
  }
  
  .content-right img {
    max-width: 60%;
  }
/* ----------------------------------------------- */