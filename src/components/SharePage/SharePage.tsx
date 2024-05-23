import { useState, useEffect, Fragment } from "react";
import { useParams } from "react-router-dom";
import { Card, Button } from "antd";
import { Gift } from "../../types";
import { GoArrowUpRight } from "react-icons/go";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGift } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";

import "./SharePage.css";

const SharePage: React.FC = () => {
  const [title, setTitle] = useState("");
  const [eventDate, setEventDate] = useState<moment.Moment | null>(null);
  const [gifts, setGifts] = useState<Gift[]>([]);
  const [description, setDescription] = useState("");
  const { uuid } = useParams<{ uuid: string }>();

  useEffect(() => {
    const fetchShareData = async () => {
      try {
        const response = await fetch(`/api/wishlists/share/${uuid}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setTitle(data.title);
        setDescription(data.description);
        setEventDate(moment(data.eventDate));
      } catch (error) {
        console.error("Error fetching share data:", error);
      }
    };
    fetchShareData();
  }, [uuid]);

  useEffect(() => {
    const fetchGifts = async () => {
      try {
        const response = await fetch(`/api/wishlists/share/${uuid}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        if (data.gifts) {
          const updatedGifts = data.gifts.map((gift: Gift) => ({
            ...gift,
            isReserved: localStorage.getItem(`gift_${gift.id}_reservation`) === "reserved",
          }));
          setGifts(updatedGifts);
        }
      } catch (error) {
        console.error("Error fetching gifts:", error);
      }
    };
    fetchGifts();
  }, [uuid]);

  const handleReserveClick = async (id: string) => {
    try {
      const updatedGifts = gifts.map((gift) =>
        gift.id === id ? { ...gift, isReserved: !gift.isReserved } : gift
      );
      setGifts(updatedGifts);
      localStorage.setItem(`gift_${id}_reservation`, updatedGifts.find((gift) => gift.id === id)?.isReserved ? "reserved" : "unreserved");
      
      await fetch(`/api/wishlists/share/${uuid}/reserve/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.error("Error updating reservation:", error);
    }
  };

  const calculateDaysLeft = (): string => {
    if (!eventDate) return "";
    const now = moment();
    const daysLeft = eventDate.diff(now, "days");
    if (daysLeft < 0) {
      return `Event has expired`;
    } else if (daysLeft === 0) {
      return "Event today";
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
                <div className="date">{eventDate.format("DD/MM/YYYY")}</div>
                <div className="days-left" style={{ backgroundColor: "orange", padding: "5px", borderRadius: "5px" }}>
                  {calculateDaysLeft()}
                </div>
              </div>
            )}
          </div>
          <div>
            <div className="share-title">{title}</div>
            <div className="share-description">{description}</div>
          </div>
        </header>
        <main className="share-content">
          <div className="share-gift-cards">
            {gifts.map((gift) => (
              <Card key={gift.id} className="share-card">
                <div className="share-card-content">
                  <div className="share-body">
                    <div className="share-card-left">
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
                    <div className="share-card-right">
                      <div className="share-card-title">{gift.title}</div>
                      <div className="share-card-price">Price: {gift.price} {gift.currency}</div>
                      <div className="share-card-comment">Comment: {gift.description}</div>
                      <Button
                        onClick={() => handleReserveClick(gift.id)}
                        className={`share-reserve-button ${gift.isReserved ? "reserved" : ""}`}
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



