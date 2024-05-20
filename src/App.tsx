import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./components/footer/Footer";
import ScrollToTop from "./utils/ScrollToTop";
import Home from "./pages/Home";
import CreateGift from "./pages/CreateGift";
import { PrivacyPolicy } from "./pages/PrivacyPolicy";
import "./App.css";
import AuthForm from "./components/Auth/AuthForm";
import SignUpPage from "./components/SignUp/SignUpPage";
import AccountPage from "./components/Account/AccountPage";
import NoPageFound from "./components/NoPageFound";
import AuthContext from "./contexts/AuthContext";
import { useEffect, useState } from "react";
import User from "./types/index";
import NavBar from "./components/navbar/NavBar";
import About from "./components/About/About";
import CreateWishlist from "./pages/CreateWishlist";
import WishListPage from "./components/WishListPage/WishListPage";


const App: React.FC = () => {
  const [user, setUser] = useState<User | undefined>(undefined);
  useEffect(() => {
    fetch("/api/users/auth/me")
      .then((data) => data.json())
      .then((u) => {
        setUser(u);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div className="App">
      <AuthContext.Provider value={{ user, setUser }}>
        <Router>
          <ScrollToTop />
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<AuthForm />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/createWishlist" element={<CreateWishlist />} />           
            <Route path="/wishlist/:id/createGift" element={<CreateGift />} />
            <Route path="/dashboard" element={<AccountPage />} />
            <Route path="/wishlist/:id" element={<WishListPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="*" element={<NoPageFound />} />
          </Routes>
          <Footer />
        </Router>
      </AuthContext.Provider>
    </div>
  );
};

export default App;
