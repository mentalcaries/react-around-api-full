import React from 'react';

function PopupWithForm({
  name,
  isOpen,
  title,
  onSubmit,
  onClose,
  onOutsideClick,
  children,
}) {
  const formRef = React.createRef();
  const [isValid, setIsValid] = React.useState(false);

  React.useEffect(() => {
    setIsValid(formRef.current.checkValidity());
  }, [formRef]);

  return (
    <div
      className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''} 
    `}
    >
      <div className="popup__overlay" onClick={onOutsideClick}>
        <div className="popup__container">
          <button
            className="popup__close-btn"
            type="button"
            onClick={onClose}
          ></button>
          <h2 className="popup__title">{title}</h2>
          <form
            className="popup__form"
            name={name}
            noValidate
            onSubmit={onSubmit}
            ref={formRef}
          >
            {children}
            <button
              className={`popup__save-btn ${
                isValid ? '' : 'popup__save-btn_disabled'
              }`}
              type="submit"
              name="Save"
              default="Save"
              disabled={!isValid}
            >
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PopupWithForm;
