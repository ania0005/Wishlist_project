import Header from "../components/header/Header";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'; // Предполагается, что вы используете React Router для навигации


import photo03 from "./../img/Photo03.png";
import gift from "./../img/gift.png"
import "../App.css";

const Home = () => {
  const navigate = useNavigate();

  const handleCreateWishlistClick = () => {
    navigate('/login');
  };

  return (
    <>
      <Header />
      <main className="body">
        <div className="container">
          <img src={photo03} alt="" className="project-instruction" />
        </div>

        <div className="purple-box">
          <div className="content-left">
            <h2 className="title">Receive only the gifts you want!</h2>
            <p>No stupid or ridiculous surprises! Add a link and be guaranteed to get what you want in the right form, color, and quality!</p>
            <Link to="/signup">
              <button>I want a Wishlist</button>
            </Link>
          </div>
          <div className="content-right">
            <img src={gift} alt="Your Alt Text" />
          </div>
        </div>

      </main>
    </>
  );
};

export default Home;