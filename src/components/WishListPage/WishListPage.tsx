import React, { useState, useEffect, Fragment } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import './WishlistPage.css';
import { DeleteOutlined, ArrowLeftOutlined, ShareAltOutlined, MoreOutlined } from '@ant-design/icons';
import { Card, Button, Modal, Typography, Dropdown, Menu } from 'antd';
import { Wishlist, Gift } from '../Wishlists/types/index';
const { Meta } = Card;
const { Text } = Typography;

const WishListPage = () => {
  const [title, setTitle] = useState('');
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const [gifts, setGifts] = useState<Gift[]>([]);
  const [wishlist, setWishlist] = useState<Wishlist>();
  const { id } = useParams();

  useEffect(() => {
    fetch(`/api/wishlists/${id}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        if (data) {
          setWishlist(data);
          setTitle(data.title);
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, [id]);

  useEffect(() => {
    fetch(`/api/wishlists/${id}/gifts`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        if (data) {
          setGifts(data);
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, [id]);

  const handleDeleteClick = () => {
    setShowModal(true);
  };

  const handleAddWishlistClick = () => {
    navigate(`/wishlist/${id}/createGift`);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleDeleteWishList = () => {
    fetch(`/api/wishlists/${id}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (response.ok) {
          document.cookie = 'accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
          localStorage.removeItem('accessToken');
          sessionStorage.clear();
          console.log('WishList successfully deleted.');
          navigate('/');
        } else {
          console.error('Failed to delete WishList.');
        }
      })
      .catch(error => {
        console.error('Error deleting WishList:', error);
      });
  };

  const handleShareClick = () => {
    const accessToken = localStorage.getItem('accessToken');
    fetch(`/api/wishlists/${id}/share`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Failed to share WishList.');
        }
      })
      .then(data => {
        const uuid = data.uuid;
        console.log(`WishList successfully shared. UUID: ${uuid}`);
        navigate(`/wishlist-share/${uuid}`);
      })
      .catch(error => {
        console.error('Error sharing WishList:', error);
      });
  };

  const handleEditGift = (gift: Gift) => {
    navigate(`/editGift/${gift.title}`);
  };

  const handleDeleteGift = (gift: Gift) => {
    fetch(`/api/wishlists/${id}/gifts/${gift.title}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (response.ok) {
          setGifts(gifts.filter(g => g.title !== gift.title));
          console.log('Gift successfully deleted.');
        } else {
          console.error('Failed to delete Gift.');
        }
      })
      .catch(error => {
        console.error('Error deleting Gift:', error);
      });
  };

  const giftMenu = (gift: Gift) => [
    {
      key: 'edit',
      label: 'Edit',
      onClick: () => handleEditGift(gift),
    },
    {
      key: 'delete',
      label: 'Delete',
      onClick: () => handleDeleteGift(gift),
    },
  ];

  return (
    <Fragment>
      <div className="dashboard">
        <header className="dashboard-header">
          <div className="user-profile">
            <div className="username">{title}</div>
            <div className="wishlist-section">
              <Link to="/dashboard" className="go-to-wishlist"><ArrowLeftOutlined /> Go to wishlists</Link>
              <Button onClick={handleAddWishlistClick} className="add-wl-button">Add gift</Button>
              <Button onClick={handleDeleteClick} className="delete-wl-button" icon={<DeleteOutlined />} />
              <Button onClick={handleShareClick} className="share-button" icon={<ShareAltOutlined />}>Share WishList</Button>
            </div>
          </div>
        </header>
        <main className="dashboard-content">
          {gifts.map((gift) => (
            <Card key={gift.title} title={gift.title} className="wishlist-card-in">
              <div style={{ position: 'relative' }}>
                <Dropdown menu={{ items: giftMenu(gift) }} trigger={['click']}>
                  <MoreOutlined style={{ position: 'absolute', top: 0, right: 0, fontSize: '24px', cursor: 'pointer' }} />
                </Dropdown>
              </div>
              <Meta description={<img src={gift.imageUrl} alt={gift.title} />} />
              <p>URL: <a href={gift.url}>{gift.url}</a></p>
            </Card>
          ))}
        </main>
        {showModal && (
          <Modal open={showModal} onCancel={handleCloseModal} onOk={handleDeleteWishList}>
            <p>Do you want to delete your WishList?</p>
          </Modal>
        )}
      </div>
    </Fragment>
  );
};

export default WishListPage;