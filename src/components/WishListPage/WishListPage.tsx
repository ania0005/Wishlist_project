
import { useState, useEffect, Fragment } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./WishlistPage.css";
import "../../App.css";
import {
  DeleteOutlined,
  ArrowLeftOutlined,
  ShareAltOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import { Card, Button, Modal, Dropdown } from "antd";
import { Gift, Wishlist } from "../../types";
import { GoArrowUpRight } from "react-icons/go";

const WishListPage = () => {
  const [title, setTitle] = useState("");
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const [gifts, setGifts] = useState<Gift[]>([]);
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
          setTitle(data.title);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [id]);

  useEffect(() => {
    fetch(`/api/wishlists/${id}/gifts`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        if (data) {
          setGifts(data);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [id]);

  const handleDeleteClick = () => {
    setShowModal(true);
  };

  const handleAddGiftClick = () => {
    navigate(`/wishlist/${id}/createGift`);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleDeleteWishList = () => {
    fetch(`/api/wishlists/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          document.cookie =
            "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
          localStorage.removeItem("accessToken");
          sessionStorage.clear();
          console.log("WishList successfully deleted.");
          navigate("/dashboard");
        } else {
          console.error("Failed to delete WishList.");
        }
      })
      .catch((error) => {
        console.error("Error deleting WishList:", error);
      });
  };

  const handleShareClick = () => {
    const accessToken = localStorage.getItem("accessToken");
    fetch(`/api/wishlists/${id}/share`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Failed to share WishList.");
        }
      })
      .then((data) => {
        const uuid = data.uuid;
        console.log(`WishList successfully shared. UUID: ${uuid}`);
        navigate(`/wishlist-share/${uuid}`);
      })
      .catch((error) => {
        console.error("Error sharing WishList:", error);
      });
  };

  const handleEditGift = (gift: Gift) => {
    navigate(`/api/gifts/${gift.id}`);
  };

  const handleDeleteGift = (gift: Gift) => {
    fetch(`/api/gifts/${gift.id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          setGifts(gifts.filter((g) => g.title !== gift.title));
          console.log("Gift successfully deleted.");
        } else {
          console.error("Failed to delete Gift.");
        }
      })
      .catch((error) => {
        console.error("Error deleting Gift:", error);
      });
  };

  const giftMenu = (gift: Gift) => [
    {
      key: "edit",
      label: "Edit",
      onClick: () => handleEditGift(gift),
    },
    {
      key: "delete",
      label: "Delete",
      onClick: () => handleDeleteGift(gift),
    },
  ];

  return (
    <Fragment>
      <div className="wishlist">
        <header className="wishlist-header">
          <div className="wishlist-profile">
            <div className="wishlist-name">
              <Link to="/dashboard" className="go-to-wishlists">
                <ArrowLeftOutlined /> Go to wishlists
              </Link>
              <br />
              {title}
            </div>
            <div className="wishlist-section">
              <Button
                onClick={handleDeleteClick}
                className="delete-wl-button"
                icon={<DeleteOutlined />}
              />
              <Button
                onClick={handleAddGiftClick}
                className="add-wl-button"
              >
                Add gift
              </Button>
              <Button
                onClick={handleShareClick}
                className="share-button"
                icon={<ShareAltOutlined />}
              >
                Share list
              </Button>
            </div>
          </div>
        </header>
        <main className="wishlist-content">
          {gifts.map((gift) => (
            <Card key={gift.id} title={gift.title} className="wishlist-card-in">
              <div style={{ position: "relative" }}>
                <Dropdown menu={{ items: giftMenu(gift) }} trigger={["click"]}>
                  <MoreOutlined
                    style={{
                      position: "absolute",
                      top: 0,
                      right: 0,
                      fontSize: "24px",
                      fontFamily: "DM Serif Display",
                      cursor: "pointer",
                    }}
                  />
                </Dropdown>
              </div>
              <img
                src={gift.imageUrl}
                alt={gift.title}
                className="gift-image"
              />
              <div>
                Price: {gift.price}
                {gift.currency}
              </div>
              <div>Comment: {gift.description}</div>
              {gift.url && (
                <a href={gift.url} className="go-to-store" target="_blank" rel="noopener noreferrer">
                To the store <GoArrowUpRight className="arrow-icon" />
              </a>
              )}
            </Card>
          ))}
        </main>
        {showModal && (
          <Modal
            open={showModal}
            onCancel={handleCloseModal}
            onOk={handleDeleteWishList}
          >
            <p>Do you really want to delete this wishlist?</p>
          </Modal>
        )}
      </div>
    </Fragment>
  );
};

export default WishListPage;





