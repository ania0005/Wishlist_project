import axios from "axios";

const logOut = async () => {
  try {
    // Отправляем запрос на сервер для выхода из аккаунта
    const response = await axios.post("/api/users/logout");

    // Проверяем успешность запроса
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Error logging out");
    }
  } catch (error: any) {
    throw new Error("Error logging out: " + error.message);
  }
};

export default logOut;
