import { NavLink, useNavigate } from "react-router-dom";
import { GoPerson } from "react-icons/go";
import "./style.css";
import { useContext } from "react";
import AuthContext from "../../contexts/AuthContext";

const NavBar = () => {
  const activeLink = "nav-list__link nav-list__link--active";
  const normalLink = "nav-list__link";

  const navigate = useNavigate();
  const { user, setUser } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/users/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        if (setUser) {
          setUser(undefined);
        }
        navigate("/");
      } else {
        console.error("Failed to log out:", response.statusText);
      }
    } catch (error: any) {
      console.error("Error when logging out of your account:", error.message);
    }
  };
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
            {user ? (
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
                <li className="nav-list__item">
                  <NavLink
                    to="/dashboard"
                    className={({ isActive }) =>
                      isActive ? activeLink : normalLink
                    }
                  >
                    <GoPerson />
                  </NavLink>
                </li>
              </>
            ) : (
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
