import Header from "../components/Header/Header";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom"; // Предполагается, что вы используете React Router для навигации
import share from "./../img/share.jpg";
import info from "./../img/info.jpg";
import gift from "./../img/gift.png";
import add from "./../img/add.jpg";
import "../App.css";

const Home = () => {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem("authToken");

  return (
    <>
      <Header />
      <main className="section">
        <div className="pink-box">
          <h2 className="title">How it works</h2>
          <div className="columns-container">
            <div className="column">
              <div className="image-container">
                <img src={add} alt="Image 1" />
              </div>
              <div className="white-rectangle-text">
                STEP 1<br />               
                 <br />
                <strong>Create a wish list</strong>
                <br />
                <br />
                Add the gifts you need with links to online store
              </div>
            </div>
            <div className="column">
              <div className="image-container">
                <img src={share} alt="Image 2" />
              </div>
              <div className="white-rectangle-text">
                STEP 2<br />               
                 <br />
                <strong>Share with your friends</strong>
                <br />
                <br />
                Send them a link and everyone can reserve a gift from the list{" "}
              </div>
            </div>
            <div className="column">
              <div className="image-container">
                <img src={info} alt="Image 3" />
              </div>
              <div className="white-rectangle-text">
                STEP 3<br />
                <br />
                <strong>Ready! Enjoy!</strong>
                <br />
                <br />
                You get cool gifts, and your friends don’t ask the question
                “What should I give?”{" "}
              </div>
            </div>
          </div>
        </div>

        <div className="purple-box">
          <div className="content-left">
            <h2 className="title">Receive only the gifts you want!</h2>
            <p>
              {" "}
              Avoid any unwanted or absurd surprises! Simply provide a link and
              ensure you receive exactly what you desire, in the perfect form,
              color, and quality!
            </p>

            {isAuthenticated ? (
              <Link to="/createWishlist">
                <button>I want a Wishlist</button>
              </Link>
            ) : (
              <Link to="/login">
                <button>I want a Wishlist</button>
              </Link>
            )}
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
