import { NavLink, useNavigate } from "react-router-dom";
import "./style.css";
import logOut from "../Auth/LogOut";

const NavBar = () => {
  const activeLink = "nav-list__link nav-list__link--active";
  const normalLink = "nav-list__link";

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logOut();
      localStorage.removeItem("authToken");
      navigate("/");
    } catch (error: any) {
      console.error("Ошибка при выходе из аккаунта:", error.message);
    }
  };

  // Проверяем, зарегистрирован ли пользователь
  const isAuthenticated = localStorage.getItem("authToken");
  
  return (
    <nav className="nav">
      <div className="container">
        <div className="nav-row">
          <NavLink to="/" className="logo">
            <strong>GiftListify</strong>
          </NavLink>
          <ul className="nav-list">
            <li className="nav-list__item">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? activeLink : normalLink
                }
              >
                Home
              </NavLink>
            </li>
            <li className="nav-list__item">
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  isActive ? activeLink : normalLink
                }
              >
                About us
              </NavLink>
            </li>
            {isAuthenticated ? ( // Если пользователь зарегистрирован
              <>
                <li className="nav-list__item">
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      isActive ? activeLink : normalLink
                    }
                    onClick={handleLogout}
                  >
                    Log Out
                  </NavLink>
                </li>
              </>
            ) : ( // Если пользователь не зарегистрирован
              <>
                <li className="nav-list__item">
                  <NavLink
                    to="/login"
                    className={({ isActive }) =>
                      isActive ? activeLink : normalLink
                    }
                  >
                    Log In
                  </NavLink>
                </li>
                <li className="nav-list__item">
                  <NavLink
                    to="/signUp"
                    className={({ isActive }) =>
                      isActive ? activeLink : normalLink
                    }
                  >
                    Sign Up
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar; 
