import React from 'react';
import Card from './Card';
import {CurrentUserContext} from '../contexts/CurrentUserContext';

function Main({
  onEditProfileClick,
  onAddPlaceClick,
  onEditAvatarClick,
  onCardClick,
  cards,
  onCardLike,
  onCardDelete,
}) {
  const currentUser = React.useContext(CurrentUserContext);
  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar">
          <img
            src={currentUser?.avatar}
            alt="User profile pic"
            className="profile__image"
          />
          <button
            className="profile__edit-image"
            type="button"
            aria-label="Edit User Photo"
            onClick={onEditAvatarClick}
          ></button>
        </div>
        <div className="profile__info">
          <div className="profile__title">
            <h1 className="profile__name">{currentUser?.name}</h1>
            <button
              className="profile__edit-btn hover-animate"
              type="button"
              aria-label="Edit profile"
              onClick={onEditProfileClick}
            ></button>
          </div>
          <p className="profile__subtitle">{currentUser?.about}</p>
        </div>
        <button
          className="profile__add-button hover-animate"
          aria-label="Add"
          type="button"
          onClick={onAddPlaceClick}
        ></button>
      </section>

      <section className="elements">
        {cards.map((card) => (
          <Card
            card={card}
            key={card._id && card._id}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
          />
        ))}
      </section>
    </main>
  );
}

export default Main;
