import React from 'react';
import PopupWithForm from './PopupWithForm';
import {CurrentUserContext} from '../contexts/CurrentUserContext';

function AddPlacePopup({isOpen, onClose, onAddPlaceSubmit, onOutsideClick}) {
  const [title, setTitle] = React.useState('');
  const [link, setLink] = React.useState('');
  const [isTitleValid, setIsTitleValid] = React.useState(false);
  const [isLinkValid, setIsLinkValid] = React.useState(false);
  const currentUser = React.useContext(CurrentUserContext);

  const titleRef = React.useRef();
  const linkRef = React.useRef();

  React.useEffect(() => {
    setTitle('');
    setLink('');
    setIsLinkValid(false);
    setIsTitleValid(false);
  }, [isOpen]);

  function handleSubmit(evt) {
    evt.preventDefault();
    onAddPlaceSubmit({
      name: title,
      link,
    });
  }

  function handleTitleChange(evt) {
    setTitle(evt.target.value);
    setIsTitleValid(evt.target.validity.valid);
  }

  function handleLinkChange(evt) {
    setLink(evt.target.value);
    setIsLinkValid(evt.target.validity.valid);
  }



  return (
    <PopupWithForm
      name="new-item"
      title="New Place"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      onOutsideClick={onOutsideClick}
    >
      <input
        type="text"
        name="name"
        id="popup_image-title"
        placeholder="Title"
        className={`popup__field ${
          isTitleValid ? '' : 'popup__field_type_error'
        }`}
        required
        minLength="2"
        maxLength="30"
        onChange={handleTitleChange}
        ref={titleRef}
        value={title}
      />

      <span
        className={`popup__error ${isTitleValid ? '' : 'popup__error_visible'}`}
        id="popup_image-title-error"
      >
        {titleRef.current?.validationMessage}
      </span>

      <input
        type="url"
        name="link"
        id="popup_image-link"
        placeholder="Image Link"
        className={`popup__field ${
          isLinkValid ? '' : 'popup__field_type_error'
        }`}
        required
        onChange={handleLinkChange}
        ref={linkRef}
        value={link}
      />

      <span
        className={`popup__error ${isLinkValid ? '' : 'popup__error_visible'}`}
        id="popup_image-link-error"
      >
        {linkRef.current?.validationMessage}
      </span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
