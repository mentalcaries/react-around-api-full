import React from "react"
import PopupWithForm from "./PopupWithForm"

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, onOutsideClick }) {

  const avatarRef = React.useRef();
  const [isInputValid, setIsInputValid] = React.useState(false)


  function handleValidityChange(evt) {
    setIsInputValid(evt.target.validity.valid)
  }


  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value
    })
  }

  return (
    <PopupWithForm name="edit-image"
      title="Change Profile Picture"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      onOutsideClick={onOutsideClick}>

      <input
        type="url"
        name="link"
        ref={avatarRef}
        id="popup_avatar-link"
        placeholder="Image Link" className={`popup__field ${isInputValid ? '' : 'popup__field_type_error'}`}
        required
        onChange={handleValidityChange}
      />

      <span className={`popup__error ${isInputValid} '' : popup__error_visible`} id="popup_avatar-link-error">{avatarRef.current?.validationMessage}</span>
    </PopupWithForm>
  )
}

export default EditAvatarPopup