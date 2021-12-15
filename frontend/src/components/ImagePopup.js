function ImagePopup({onClose, card, onOutsideClick}) {
  return (
    <div className={`popup popup_type_picture ${card && 'popup_opened'} `}>
      <div className="popup__overlay" onClick={onOutsideClick}>
        <div className="popup__container popup__container_open-image">
          <button
            className="popup__close-btn hover-animate"
            type="button"
            onClick={onClose}
          />
          <figure className="popup__figure">
            <img
              className="popup__image"
              src={card?.link}
              alt={` ${card?.name}`}
            />
            <figcaption className="popup__caption">{card?.name}</figcaption>
          </figure>
        </div>
      </div>
    </div>
  );
}

export default ImagePopup;
