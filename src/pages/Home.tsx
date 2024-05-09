import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import photo03 from "./../img/Photo03.png";
import "../App.css";

const Home = () => {
  return (
    <>
      <Header />
      <main className="body">
        <div className="container">
          <img src={photo03} alt="" className="project-instruction" />
        </div>
      </main>
      
    </>
  );
};

export default Home;