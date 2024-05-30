import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./Style.css";
import AuthContext from "../../contexts/AuthContext";

const Header = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const handleCreateWishlistClick = () => {
    user ? navigate("/createWishlist") : navigate("/login");
  };

  return (
    <header className="header">
      <div className="header__wrapper">
        <h1 className="header__title">
          <strong>
            <em>GiftListify</em>
          </strong>
          <br />
          wishlist creation service
        </h1>
        <div className="header__text">
          <p>Share your wishes with your friends and receive only “must-have” gifts.</p>
        </div>
        <button
          className="create_list_button"
          onClick={handleCreateWishlistClick}
        >
          Create a new wishlist
        </button>
      </div>
    </header>
  );
};

export default Header;
