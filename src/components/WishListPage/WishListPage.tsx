import { useState, useEffect, Fragment } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./WishListPage.css";
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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGift } from "@fortawesome/free-solid-svg-icons";

const WishListPage = () => {
  const [title, setTitle] = useState("");
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const [gifts, setGifts] = useState<Gift[]>([]);
  const [wishlist, setWishlist] = useState<Wishlist | undefined>();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (!id) return;

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
    if (!id) return;

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
    if (id) navigate(`/wishlist/${id}/createGift`);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleDeleteWishList = () => {
    if (!id) return;

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
    if (id) navigate(`/mywishlist/${id}`)
  

    // const accessToken = localStorage.getItem("accessToken");
    // fetch(`/api/wishlists/${id}/share`, {
    //   method: "POST",
    //   headers: {
    //     Authorization: `Bearer ${accessToken}`,
    //   },
    // })
    //   .then((response) => {
    //     if (response.ok) {
    //       return response.json();
    //     } else {
    //       throw new Error("Failed to share WishList.");
    //     }
    //   })
    //   .then((data) => {
    //     const uuid = data.uuid;
    //     console.log(`WishList successfully shared. UUID: ${uuid}`);
    //     navigate(`/wishlist-share/${uuid}`);
    //   })
    //   .catch((error) => {
    //     console.error("Error sharing WishList:", error);
    //   });
  };

  const handleEditGift = (gift: Gift) => {
    if (gift.id) navigate(`/gift/${gift.id}/editGift`);
  };

  const handleDeleteGift = (gift: Gift) => {
    fetch(`/api/gifts/${gift.id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          setGifts(gifts.filter((g) => g.id !== gift.id));
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
            <Link to="/dashboard" className="go-to-wishlists">
              <ArrowLeftOutlined /> Go to wishlists
            </Link>
            <div className="wishlist-name">
              {title}
              <Button
                onClick={handleDeleteClick}
                className="delete-wl-button"
                icon={<DeleteOutlined />}
              />
            </div>
            <div className="wishlist-section">
              <Button onClick={handleAddGiftClick} className="add-wl-button">
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
            <Card key={gift.id} className="share-card">
              <div className="card-content">
                <div className="card-body">
                  <div className="card-left">
                    {gift.imgUrl ? (
                      <img
                        src={gift.imgUrl}
                        alt={gift.title}
                        className="share-gift-image"
                      />
                    ) : (
                      <FontAwesomeIcon
                        icon={faGift}
                        className="share-gift-image-placeholder"
                      />
                    )}
                    {gift.url && (
                      <a
                        href={gift.url}
                        className="share-go-to-store"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        To the store <GoArrowUpRight className="arrow-icon" />
                      </a>
                    )}
                  </div>
                  <div className="card-right">
                    <div className="share-card-title">{gift.title}</div>
                    <div className="share-card-price">
                      Price: {gift.price} {gift.currency}
                    </div>
                    <div className="share-card-comment">
                      Comment: {gift.description}
                    </div>
                  </div>
                  <Dropdown menu={{ items: giftMenu(gift) }} trigger={["click"]}>
                    <MoreOutlined
                      style={{
                        position: "absolute",
                        top: 24,
                        right: 8,
                        fontSize: "24px",
                        fontFamily: "DM Serif Display",
                        cursor: "pointer",
                      }}
                    />
                  </Dropdown>
                </div>
              </div>
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



