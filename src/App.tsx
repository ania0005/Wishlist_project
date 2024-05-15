import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import ScrollToTop from "./utils/ScrollToTop";
import Home from "./pages/Home";
import CreateWishlist from './components/Wishlists/CreateWishlist/CreateWishlist';
import CreateGift from './pages/CreateGift';
import { PrivacyPolicy } from './pages/PrivacyPolicy'
import NavBar from './components/Navbar/NavBar';
import "./App.css";
import AuthForm from './components/Auth/AuthForm'; 
import SignUpPage from './components/SignUp/SignUpPage';
import About from './pages/About';
import AccountPage from "./components/Account/AccountPage";
import WishListPage from "./components/WishListPage/WishListPage";
import NoPageFound from "./components/NoPageFound/NoPageFound";



const App: React.FC = () => {
   
console.log("Hello")
    return (
        <div className='App'>
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
                    <Route path="/wishlist" element={<WishListPage />} /> 
                    <Route path="/signup" element={<SignUpPage />} />
                    <Route path="*" element={<NoPageFound />} />

                </Routes>
                <Footer />
            </Router>
        </div>
    );
};

export default App;
