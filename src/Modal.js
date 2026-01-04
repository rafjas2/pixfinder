import React from "react";
import "./App.css";
import icon from "./images/icon.svg";

const Modal = ({ isOpen, image, tags, userImg, user, onClose }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div>
      <section className="bg-modal">
        <div className="modal-box">
          <span className="close" onClick={onClose}>
            +
          </span>
          <img
            className="modal-img"
            src={image}
            alt={tags}
          />
          <div className="user-data">
            <img
              className="user-img"
              src={userImg ? userImg : icon}
              alt="User"
            />
            <h4>By: {user}</h4>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Modal;