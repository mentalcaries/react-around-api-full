import React from 'react';
import {CurrentUserContext} from '../contexts/CurrentUserContext';

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);

  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }

  //Delete button visible
  const isOwn = props.card.owner._id === currentUser._id;
  const cardDeleteButtonClassName = `card__delete-button ${
    isOwn ? 'card__delete-button_visible' : ' '
  }`;

  // Check if the card was liked by the current user
  
  const isLiked = props.card.likes && props.card.likes.some((i) => i._id === currentUser._id);
  
  const cardLikeButtonClassName = `card__like-button ${
    isLiked ? 'card__like-button_active' : ''
  }`;

  return (
    <article className="card">
      <button
        className={cardDeleteButtonClassName}
        type="button"
        aria-label="Delete card"
        onClick={handleDeleteClick}
      ></button>
      <img
        className="card__image"
        src={props.card.link}
        alt=""
        onClick={handleClick}
      />
      <div className="card__items">
        <h2 className="card__title">{props.card.name}</h2>
        <div className="card__likes">
          <button
            className={cardLikeButtonClassName}
            type="button"
            aria-label="Like this"
            onClick={handleLikeClick}
          ></button>
          <p className="card__like-count">{props.card.likes && props.card.likes.length}</p>
        </div>
      </div>
    </article>
  );
}

export default Card;
