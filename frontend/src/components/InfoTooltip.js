import React from "react";
import MessagePopup from "./MessagePopup";
import success from "../images/success.svg"
import failure from "../images/failure.svg"

function InfoTooltip({isOpen, onClose, onOutsideClick, isSuccess}){

  return(
    <MessagePopup isOpen={isOpen} onClose={onClose} onOutsideClick={onOutsideClick}>
      
      {isSuccess? <img className="tooltips__image" src={success} alt="Signup Successful" /> : <img className="tooltips__image" src={failure} alt="Signup Failed" /> }
      {isSuccess?  <h2 className="tooltips__text">Success! You have now been registered.</h2> : <h2 className="tooltips__text">Oops, something went wrong! Please try again.</h2>}
    </MessagePopup>
  )
}

export default InfoTooltip