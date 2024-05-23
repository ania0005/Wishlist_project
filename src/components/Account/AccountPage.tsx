import { useState, useEffect, Fragment } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './AccountPage.css';
import { GoTrash } from "react-icons/go";
import { FaGift } from 'react-icons/fa';
import { Wishlist, Gift } from './types';
import moment from 'moment'; // Импортируем библиотеку moment для работы с датами
import { Card, List, Button, Typography} from 'antd';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css'; 

const { Meta } = Card;
const { Text } = Typography;

const AccountPage = () => {
  const [username, setUsername] = useState('');
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const [wishlists, setWishlists] = useState<Wishlist[]>([]);
  const [giftCounts, setGiftCounts] = useState<{ [key: string]: number }>({});

  const getGiftCount = async (wishlist: Wishlist): Promise<number> => {
    let giftCount = 0;
    try {
      const response = await fetch(`api/wishlists/${wishlist.id}/gifts`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const gifts = await response.json();
      giftCount = gifts.length;
    } catch (error) {
      console.error('Error:', error);
    }
    return giftCount;
  };

  useEffect(() => {
    const fetchGiftCounts = async () => {
      const giftCounts: { [key: string]: number } = {};
      for (const wishlist of wishlists) {
        const giftCount = await getGiftCount(wishlist);
        giftCounts[wishlist.id] = giftCount;
      }
      setGiftCounts(giftCounts);
    };
  

    fetchGiftCounts();
  }, [wishlists]);

  useEffect(() => {
    fetch('/api/users/auth/me')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json(); 
      })
      .then(data => {
        if (data) {
          setUsername(data.firstName);
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  
    fetch('/api/wishlists') // Получаем все вишлисты пользователя
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json(); 
      })
      .then(async (data: Wishlist[]) => {
        if (data) {
          setWishlists(data); // Устанавливаем вишлисты как полученные данные
          const giftCounts: { [key: string]: number } = {};
          for (const wishlist of data) {
            const giftCount = await getGiftCount(wishlist);
            giftCounts[wishlist.id] = giftCount;
          }
          setGiftCounts(giftCounts);
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []);
  
  
  const handleDeleteClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleDeleteAccount = () => {
    fetch('/api/users/auth/me', {
      method: 'DELETE',
    })
    .then(response => {
      if (response.ok) {
        document.cookie = 'authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        localStorage.removeItem('authToken'); 
        sessionStorage.clear(); 
        console.log('Account successfully deleted.');
        window.location.reload();
        window.location.href = '/';
      } else {
        console.error('Failed to delete account.');
      }
    })
    .catch(error => {
      console.error('Error deleting account:', error);
    });
  };

  const handleAddGiftClick = (event: React.MouseEvent, id: string) => {
    event.stopPropagation(); // Останавливаем всплытие события
   navigate(`/wishlist/${id}/createGift`);
  };

  const handleCardClick = (id: string) => {
    navigate(`/wishlist/${id}`);
  };

  const calculateDaysLeft = (eventDate: string) => {
    const now = moment();
    const event = moment(eventDate);
    return event.diff(now, 'days');
  };
  const items = wishlists.map((wishlist) => (
    <div key={wishlist.id}>
      <Card title={wishlist.title} className="wishlist-card-in-account" onClick={() => handleCardClick(wishlist.id)}>
        <Text className="event-date-in-account">{wishlist.eventDate.split('T')[0]}</Text>
        <Meta description={wishlist.comment} />
        <Button onClick={(event) => handleAddGiftClick(event, wishlist.id)} className="add-gift-in-card-button-in-account">add gift</Button>
        <p className="time-left-text-in-account">Days left: {calculateDaysLeft(wishlist.eventDate)}</p>
        <p className="gift-count-text-in-account">Gift count: {giftCounts[wishlist.id] ?? 'Loading...'}</p>
      </Card>
    </div>
  ));
  return (
    <Fragment>
      <div className="dashboard-in-account">
        <header className="dashboard-header-in-account">
          <div className="user-profile-in-account">
            <div className="user-icon-in-account"></div>
            <div className="username-in-account">{username}</div>
            <div className="wishlist-section-in-account">
              <span className="my-wishlists-in-account">My Wishlists</span>
              <Link to="/createWishList" className="create-wishlist-button-in-account">Create WishList</Link>
              <button onClick={handleDeleteClick} className="delete-button-in-account"><GoTrash /> delete </button>
            </div>
          </div>
        </header>
        <main className="dashboard-content-in-account"style={{ marginTop: '360px', display: 'flex', flexDirection: 'row', flexWrap: 'wrap', position: 'fixed' }}>
          <AliceCarousel
            mouseTracking
            items={items}
            responsive={{
              0: { items: 1 },
              375:{ items: 1 },
              425: { items:2 },
              768: { items: 3 },
              1024: { items: 4 },
            }}
          />
        </main>
      </div>
      {showModal && (
        <div className="modal-in-account">
          <div className="modal-content-in-account">
            <span className="close-button-in-account" onClick={handleCloseModal}>×</span>
            <p>Do you want to delete your account?</p>
            <button onClick={handleDeleteAccount} className="delete-account-button">Delete Account</button>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default AccountPage;