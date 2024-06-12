import { useState, useEffect, Fragment } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Card, Button, Modal, Dropdown, message } from "antd";
import {
  DeleteOutlined,
  ArrowLeftOutlined,
  ShareAltOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import { Gift } from "../../types";
import { GoArrowUpRight } from "react-icons/go";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGift } from "@fortawesome/free-solid-svg-icons";
import styles from "./WishListPage.module.css";
import "../../App.css";

const WishListPage: React.FC = () => {
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const navigate = useNavigate();
  const [gifts, setGifts] = useState<Gift[]>([]);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (!id) return;

    const fetchWishlist = async () => {
      try {
        const response = await fetch(`/api/wishlists/${id}`);
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        setTitle(data.title);
        setComment(data.description);
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      }
    };

    const fetchGifts = async () => {
      try {
        const response = await fetch(`/api/wishlists/${id}/gifts`);
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        setGifts(data);
      } catch (error) {
        console.error("Error fetching gifts:", error);
      }
    };

    fetchWishlist();
    fetchGifts();
  }, [id]);

  useEffect(() => {
    gifts.forEach((gift) => {
      const reservationStatus = localStorage.getItem(
        `gift_${gift.id}_reservation`
      );
      if (reservationStatus) {
        setGifts((prevGifts) =>
          prevGifts.map((prevGift) =>
            prevGift.id === gift.id
              ? { ...prevGift, isReserved: reservationStatus === "reserved" }
              : prevGift
          )
        );
      }
    });
  }, [gifts]);

  const handleDeleteClick = () => setShowModal(true);
  const handleAddGiftClick = () => id && navigate(`/wishlist/${id}/createGift`);
  const handleCloseModal = () => setShowModal(false);
  const handleDeleteWishList = async () => {
    if (!id) return;
    try {
      const response = await fetch(`/api/wishlists/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        document.cookie =
          "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        localStorage.removeItem("accessToken");
        sessionStorage.clear();
        navigate("/dashboard");
      } else {
        console.error("Failed to delete WishList.");
      }
    } catch (error) {
      console.error("Error deleting WishList:", error);
    }
  };

  const handleShareClick = () => setShowShareModal(true);
  const handleCopyLink = async () => {
    if (!id) return;
    try {
      const response = await fetch(`/api/wishlists/${id}/share`, {
        method: "POST",
      });
      const data = await response.json();
      const link = `${window.location.origin}/#/mywishlist/${data.uuid}`;
      await navigator.clipboard.writeText(link);
      setShowShareModal(false);
      message.success("Link copied", 2);
    } catch (error) {
      console.error("Failed to copy link:", error);
    }
  };

  const handleEditGift = (gift: Gift) =>
    gift.id && navigate(`/gift/${gift.id}/editGift`);

  const handleDeleteGift = async (gift: Gift) => {
    try {
      const response = await fetch(`/api/gifts/${gift.id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setGifts(gifts.filter((g) => g.id !== gift.id));
      } else {
        console.error("Failed to delete Gift.");
      }
    } catch (error) {
      console.error("Error deleting Gift:", error);
    }
  };

  const giftMenu = (gift: Gift) => [
    { key: "edit", label: "Edit", onClick: () => handleEditGift(gift) },
    { key: "delete", label: "Delete", onClick: () => handleDeleteGift(gift) },
  ];

  return (
    <Fragment>
      <div className={styles.wishlist}>
        <header className={styles.wishlistHeader}>
          <div className={styles.wishlistProfile}>
            <Link to="/dashboard" className={styles.goToWishlists}>
              <ArrowLeftOutlined /> Go to wishlists
            </Link>
            <div className={styles.wishlistButtons}>
              <Button
                onClick={handleDeleteClick}
                className={styles.deleteWlButton}
                icon={<DeleteOutlined />}
              />
              <Button
                onClick={handleShareClick}
                className={styles.shareButton}
                icon={<ShareAltOutlined />}
              >
                Share list
              </Button>
              <Button
                onClick={handleAddGiftClick}
                className={styles.addWlButton}
              >
                Add gift
              </Button>
            </div>
            <div className={styles.wishlistName}>{title}</div>
            {comment && <div className={styles.wishlistComment}>{comment}</div>}
          </div>
        </header>
        <main className={styles.wishlistContent}>
          {gifts.map((gift) => (
            <Card key={gift.id} className={styles.giftCard}>
              <div className={styles.giftContent}>
                <div className={styles.giftBody}>
                  <div className={styles.giftLeft}>
                    {gift.imgUrl ? (
                      <img
                        src={gift.imgUrl}
                        alt={gift.title}
                        className={styles.giftImage}
                      />
                    ) : (
                      <FontAwesomeIcon
                        icon={faGift}
                        className={styles.giftImagePlaceholder}
                      />
                    )}
                    {gift.url && (
                      <a
                        href={gift.url}
                        className={styles.giftGoToStore}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        To the store
                        <GoArrowUpRight className={styles.arrowIconW} />
                      </a>
                    )}
                  </div>
                  <div className={styles.giftRight}>
                    <div
                      className={`${styles.giftCardTitle} ${
                        gift.title.length > 15 ? styles.smallFontTitle : ""
                      }`}
                    >
                      {gift.title}
                    </div>
                    <div
                      className={`${styles.giftCardPrice} ${
                        gift.price.toString().length > 8
                          ? styles.smallFontTitle
                          : ""
                      }`}
                    >
                      Price: {gift.price} {gift.currency}
                    </div>

                    <div
                      className={`${styles.giftCardComment} ${
                        gift.description.length > 25
                          ? styles.smallFontComment
                          : ""
                      }`}
                    >
                      Comment: {gift.description}
                    </div>
                  </div>
                  <Dropdown
                    menu={{ items: giftMenu(gift) }}
                    trigger={["click"]}
                  >
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
          <Modal open={showModal} onCancel={handleCloseModal} footer={null}>
            <p>Do you really want to delete this wishlist?</p>
            <div className={styles.modalFooter}>
              <Button
                onClick={handleDeleteWishList}
                className={styles.deleteWlConfirmButton}
              >
                OK
              </Button>
            </div>
          </Modal>
        )}
        {showShareModal && (
          <Modal
            open={showShareModal}
            onCancel={() => setShowShareModal(false)}
            footer={[
              <Button
                key="copy"
                onClick={handleCopyLink}
                className={styles.copyLink}
              >
                Copy
              </Button>,
            ]}
          >
            <p>Copy link?</p>
          </Modal>
        )}
      </div>
    </Fragment>
  );
};

export default WishListPage;
