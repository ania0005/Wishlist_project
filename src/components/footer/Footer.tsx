import React from "react";
import styles from "./Footer.module.css";
import gitHub from "./../../img/gitHub.svg";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer__wrapper}>
        <ul className={styles.footer__left}>
          <li>© 2024 Made with love for good gifts</li>
          <li className={styles.privacyPolicy}>
            <a href="/#/privacy-policy">Privacy Policy</a>
          </li>
        </ul>
        
        <ul className={styles.footer__right}>
          <li>Linkstraße 2/8 Etage, 10785 Berlin, AIT-TR</li>
        </ul>
        <ul className={styles.github_logo}>
          <li className={styles.social__item}>
            <a
              href="https://github.com/ania0005/Wishlist_project"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={gitHub} alt="Link" />
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;