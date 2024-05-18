import React, { useState, useEffect, Fragment } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './AccountPage.css';
import { GoTrash } from "react-icons/go";

import moment from 'moment'; // Импортируем библиотеку moment для работы с датами
import { Card, List, Button, Typography, Row, Col } from 'antd'; 
// Импортируем Row и Col из antd для создания сетки
const { Meta } = Card;
const { Text } = Typography;

// Наши интерфейсы массивов

interface Wishlist {
  id: string;
  title: string;
  comment: string;
  eventDate: string;
  gifts: Gift[];
}

interface Gift {
  title: string;
  url: string;
  imageUrl: string; 
}

const AccountPage = () => {
  const [username, setUsername] = useState('');
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const [wishlists, setWishlists] = useState<Wishlist[]>([]); // Используем интерфейс
  
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
      .then(data => {
        if (data) {
          setWishlists(data); // Устанавливаем вишлисты как полученные данные
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
        navigate('/'); 
      } else {
        console.error('Failed to delete account.');
      }
    })
    .catch(error => {
      console.error('Error deleting account:', error);
    });
  };

  const handleAddGiftClick = () => {
    navigate('/createGift');
  };

  const handleCardClick = (id: string) => {
    navigate(`/wishlist/${id}`);
  };

  const calculateDaysLeft = (eventDate: string) => {
    const now = moment();
    const event = moment(eventDate);
    return event.diff(now, 'days');
  };

  return (
    <Fragment>
      <div className="dashboard">
        <header className="dashboard-header">
          <div className="user-profile">
            <div className="user-icon"></div>
            <div className="username">{username}</div>
            <div className="wishlist-section">
              <span className="my-wishlists">My WishLists</span>
              <Link to="/createWishList" className="create-wishlist-button">Create WishList</Link>
              <button onClick={handleDeleteClick} className="delete-button"><GoTrash /> delete </button>
            </div>
          </div>
        </header>
        <main className="dashboard-content">
          <Row gutter={16}> {/* Создаем сетку с отступом между колонками в 16px */}
            {wishlists.map((wishlist) => (
              <Col span={6} key={wishlist.id}> {/* Каждая карточка занимает 6/24 всей ширины, т.е. в ряду будет 4 карточки */}
                <Card title={wishlist.title} className="wishlist-card-in" onClick={() => handleCardClick(wishlist.id)}>
                  <Text className="event-date">{wishlist.eventDate.split('T')[0]}</Text> {/* Отображаем дату сразу под названием */}
                  <Meta description={wishlist.comment} />
                  {wishlist.gifts && wishlist.gifts.length > 0 && (
                    <List
                      itemLayout="horizontal"
                      dataSource={wishlist.gifts}
                      renderItem={(gift: Gift) => (
                        <List.Item>
                          <List.Item.Meta
                            title={gift.title}
                            description={`URL: ${gift.url}`}
                          />
                        </List.Item>
                      )}
                    />
                  )}
                  <Button onClick={handleAddGiftClick} className="add-gift-in-card-button">add gift</Button>
                  <Button className="time-left-button">Осталось дней: {calculateDaysLeft(wishlist.eventDate)}</Button>
                </Card>
              </Col>
            ))}
          </Row>
        </main>
      </div>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-button" onClick={handleCloseModal}>×</span>
            <p>Do you want to delete your account?</p>
            <button onClick={handleDeleteAccount} className="delete-account-button">Delete Account</button>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default AccountPage;