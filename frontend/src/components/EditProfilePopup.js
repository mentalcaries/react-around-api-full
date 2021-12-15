import React from 'react';
import {CurrentUserContext} from '../contexts/CurrentUserContext';
import PopupWithForm from './PopupWithForm';

function EditProfilePopup({isOpen, onClose, onUpdateUser, onOutsideClick}) {
  const currentUser = React.useContext(CurrentUserContext);

  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  const nameRef = React.useRef();
  const descriptionRef = React.useRef();
  const [isNameValid, setIsNameValid] = React.useState(true);
  const [isDescriptionValid, setIsDescriptionValid] = React.useState(true);

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleNameChange(evt) {
    setName(evt.target.value);
    setIsNameValid(evt.target.validity.valid);
  }

  function handleDescriptionChange(evt) {
    setDescription(evt.target.value);
    setIsDescriptionValid(evt.target.validity.valid);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name="edit-profile"
      title="Edit Profile"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      onOutsideClick={onOutsideClick}
    >
      <input
        type="text"
        name="name"
        id="popup_name"
        value={name || ''}
        onChange={handleNameChange}
        placeholder="Name (eg. Jacques Cousteau)"
        className={`popup__field ${
          isNameValid ? '' : 'popup__field_type_error'
        }`}
        minLength="2"
        maxLength="40"
        ref={nameRef}
        autoComplete="off"
        required
      />

      <span
        className={`popup__error ${isNameValid ? '' : 'popup__error_visible'}`}
        id="popup_name-error"
      >
        {nameRef.current?.validationMessage}
      </span>

      <input
        type="text"
        name="title"
        id="popup_title"
        value={description || ''}
        onChange={handleDescriptionChange}
        placeholder="Title (eg. Explorer)"
        className={`popup__field ${
          isDescriptionValid ? '' : 'popup__field_type_error'
        }`}
        minLength="2"
        maxLength="200"
        ref={descriptionRef}
        autoComplete="off"
        required
      />

      <span
        className={`popup__error ${
          isDescriptionValid ? '' : 'popup__error_visible'
        }`}
        id="popup_title-error"
      >
        {descriptionRef.current?.validationMessage}
      </span>
    </PopupWithForm>
  );
}
export default EditProfilePopup;
