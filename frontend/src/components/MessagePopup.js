import React from 'react';

function MessagePopup({isOpen, onClose, onOutsideClick, children}) {
  return (
    <div
      className={`popup popup_type_confirm ${isOpen ? 'popup_opened' : ''} 
    `}
    >
      <div className="popup__overlay" onClick={onOutsideClick}>
        <div className="popup__container popup__container_confirm-delete">
          <button className="popup__close-btn hover-animate" type="button" onClick={onClose}></button>

          <div className="popup__form">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default MessagePopup;
