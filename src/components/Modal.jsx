import React from "react";
import CloseImg from "../assets/close.svg";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <img className="close-img" onClick={onClose} src={CloseImg} />
        {children}
      </div>
    </div>
  );
};

export default Modal;
