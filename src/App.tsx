import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import ScrollToTop from "./utils/ScrollToTop";
import Home from "./pages/Home";
import CreateWishlist from "./components/Wishlists/CreateWishlist/CreateWishlist";
import CreateGift from "./pages/CreateGift";
import { PrivacyPolicy } from "./pages/PrivacyPolicy";
import NavBar from "./components/Navbar/NavBar";
import "./App.css";
import AuthForm from "./components/Auth/AuthForm";
import SignUpPage from "./components/SignUp/SignUpPage";
import About from "./components/About/About";
import AccountPage from "./components/Account/AccountPage";

import NoPageFound from "./components/NoPageFound";
import AuthContext from "./contexts/AuthContext";
import { useEffect, useState } from "react";
import User from "./types/User";
import WishlistPage from "./components/WishlistPage/WishlistPage";

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
            <Route path="/createGift" element={<CreateGift />} />
            <Route path="/dashboard" element={<AccountPage />} />
            <Route path="/wishlist" element={<WishlistPage />} />
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
