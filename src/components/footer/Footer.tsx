import './Style.css';
import gitHub from "./../../img/gitHub.svg";

const Footer = () => {
  return ( 
    <footer className="footer">
      <div className="footer__wrapper">
        <ul className="footer__left">
          <li>© 2024 Made with love for good gifts</li>
          <li>Cohort-34</li>
        </ul>
        
        <ul className="github_logo">
        <li className='privacy-policy'><a href="/privacy-policy">Privacy Policy</a></li>
        <li className="social__item"><a href="https://github.com/ania0005/Wishlist-project" target="_blank"><img src={gitHub} alt="Link"/></a></li>
        
        <ul className="footer__right">
          
          <li>Linkstraße 2/8 Etage,<br/>10785 Berlin<br/>AIT-TR</li>
        </ul> </ul> 
      </div>
    </footer>
  );
}

export default Footer;