import React from "react";

const BformModal = ({ imageUrl, onClose }) => {
  return (
    <div className="bform-modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <img src={imageUrl} alt="bform" />
      </div>
    </div>
  );
};

export default BformModal;
