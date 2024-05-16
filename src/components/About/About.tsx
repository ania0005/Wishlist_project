import React from 'react';
import './About.css';

const AboutPage: React.FC = () => {
  return (
    <div className="about-page">
      <p className="paragraph-first">
        "GiftListify" is a convenient Wishlist service designed to ensure that you receive and give only the gifts you want!
      </p>
      <h2 className="sub-title">What is a Wishlist and what is it for?</h2>
      <p className="paragraph">
        Wishlist is a list of your desires: what you want to receive as a gift or purchase. You can make such a list not only for your birthday, but also for your wedding or its anniversary, for New Year, gender party, mothers or fathers day, in general, for any holiday! And you can add gifts without an occasion :) A Wishlist will help you decide what you want and save you from silly and unnecessary gifts: share your Wishlist with your loved ones and they will always know what to get you.
      </p>
      <h2 className="sub-title">How to create a Wishlist?</h2>
      <p className="paragraph">
        Using the service is very easy! <br />
        1. Register on the portal. <br />
        2. Make your list of desired gifts. When adding a gift, provide a link to a product or service from any online store. The link will make it easier for your friends to find and order a gift. And you will definitely get what you want in the right color, size and quantity. <br />
        3. Make the list public and send the link to your friends and family. <br />
        4. Done! 
        <br/>
        Your friends and family will no longer have to rack their brains and run around the city looking for a gift. And you will get only what you wished for. No “souvenirs”, questionable sculptures for the interior and other things created only to fill the vacuum in response to the question: “What to give?!”. We make the process of giving and receiving gifts simple and enjoyable for everyone involved in this sacred process.
      </p>
      <h2 className="sub-title">How else can you use a Wishlist?</h2>
      <p className="paragraph">
        Wishlists can be used as your own shopping list. Everything you were going to buy sometime later but always lost the link can now be saved in a convenient and safe place. Going on a trip or camping trip with friends? Preparing a party at the office? Make a shopping list in the GiftListify. Distribute the purchases among the participants. That way you won't forget anything! Give and receive only the gifts you want. It's so easy with GiftListify!
      </p>
      <h2 className="sub-title">Contact Us</h2>
      <p className="paragraph">
        Customer Support: <a href="mailto:help@giftlistify.com">help@giftlistify.com</a>
        <br />
        Collaboration: <a href="mailto:info@giftlistify.com">info@giftlistify.com</a>

      </p>

    </div>
  );
};

export default AboutPage;
