import './Style.css';
import gitHub from "./../../img/gitHub.svg";

const Footer = () => {
  return ( 
    <footer className="footer">
      <div className="footer__wrapper">
        <ul className="footer__left">
          <li>© 2024 Made with love for good gifts</li>
       
        </ul>
        
        <ul className="github_logo">
        <li className='privacy-policy'><a href="/privacy-policy">Privacy Policy</a></li>
        
        <ul className="footer__right">
          
          <li>Linkstraße 2/8 Etage, 10785 Berlin, AIT-TR</li>
          <li className="social__item"><a href="https://github.com/ania0005/Wishlist_project" target="_blank"><img src={gitHub} alt="Link"/></a></li>

        </ul> </ul> 
      </div>
    </footer>
  );
}

export default Footer;