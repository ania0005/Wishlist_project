import { useState, useEffect, Fragment } from "react";
import { useParams } from "react-router-dom";
import { Card, Button } from "antd";
import { Gift, Wishlist } from "../../types";
import { GoArrowUpRight } from "react-icons/go";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGift } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";

import "./SharePage.css";

const SharePage: React.FC = () => {
  const [title, setTitle] = useState("");
  const [eventDate, setEventDate] = useState<string>("");
  const [gifts, setGifts] = useState<Gift[]>([]);
  const [description, setDescription] = useState("");
  const [wishlist, setWishlist] = useState<Wishlist>();
  const { id } = useParams();

  useEffect(() => {
    fetch(`/api/wishlists/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        if (data) {
          setWishlist(data);
          setEventDate(data.eventDate);
          setTitle(data.title);
          setDescription(data.description);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [id]);

  useEffect(() => {
    if (wishlist) {
      fetch(`/api/wishlists/${id}/gifts`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          if (data) {
            setGifts(data.map((gift: Gift) => ({ ...gift, isReserved: gift.isReserved || false })));
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }, [wishlist, id]);

  const handleReserveClick = (giftId: string) => {
    const updatedGifts = gifts.map((gift) =>
      gift.id === giftId ? { ...gift, isReserved: !gift.isReserved } : gift
    );

    const updatedGift = updatedGifts.find((gift) => gift.id === giftId);

    // Make the API call to update the reservation status in the backend
    fetch(`/api/gifts/${giftId}/reserve`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ isReserved: updatedGift?.isReserved }),
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => {
      if (data.success) {
        // Update the state only if the API call was successful
        setGifts(updatedGifts);
      } else {
        // Handle the case where the reservation update failed
        console.error('Failed to update reservation status');
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  };

  const calculateDaysLeft = (eventDate: string) => {
    const now = moment();
    const event = moment(eventDate);
    const daysLeft = event.diff(now, "days");
    if (daysLeft < 0) {
      return `Event date has passed (${Math.abs(daysLeft)} days ago)`;
    } else if (daysLeft === 0) {
      return "Event has expired";
    }
    return `in ${daysLeft} day(s)`;
  };

  return (
    <Fragment>
      <div className="wishlist">
        <header className="share-header">
          <div className="share-event-date">
            {eventDate && (
              <div className="days-left-container">
                <div className="date">
                  {new Date(eventDate).toLocaleDateString('en-GB', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                  })}
                </div>
                <div className="days-left" style={{ backgroundColor: "orange", padding: "5px", borderRadius: "5px" }}>
                  {calculateDaysLeft(eventDate)}
                </div>
              </div>
            )}
          </div>
          <div>
            <div className="share-title">
              {title}
            </div>
            <div className="share-description">
              {description}
            </div>
          </div>
        </header>
        <main className="share-content">
          <div className="share-gift-cards">
            {gifts.map((gift) => (
              <Card key={gift.id} className="share-card">
                <div className="card-content">
                  <div className="card-body">
                    <div className="card-left">
                      {gift.imgUrl ? (
                        <img src={gift.imgUrl} alt={gift.title} className="share-gift-image" />
                      ) : (
                        <FontAwesomeIcon icon={faGift} className="share-gift-image-placeholder" />
                      )}
                      {gift.url && (
                        <a href={gift.url} className="share-go-to-store" target="_blank" rel="noopener noreferrer">
                          To the store <GoArrowUpRight className="arrow-icon" />
                        </a>
                      )}  
                    </div>
                    <div className="card-right">
                      <div className="share-card-title">{gift.title}</div>
                      <div className="share-card-price">Price: {gift.price} {gift.currency}</div>
                      <div className="share-card-comment">Comment: {gift.description}</div>
                      <Button
                        onClick={() => handleReserveClick(gift.id)}
                        className={`reserve-button ${gift.isReserved ? "reserved" : ""}`}
                      >
                        {gift.isReserved ? "Reserved" : "Reserve"}
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </main>
      </div>
    </Fragment>
  );
};

export default SharePage;
