import React, { Component } from "react";
import "./App.css";
import "./reset.css";
import icon from "./icon.svg";

class Modal extends Component {
  render() {
    let modal = this.newModal();

    if (!this.props.isOpen) {
      modal = null;
    }

    return <div>{modal}</div>;
  }

  newModal() {
    return (
      <section className="bg-modal">
        <div className="modal-box">
          <span className="close" onClick={this.props.onClose}>
            +
          </span>
          <img
            className="modal-img"
            src={this.props.image}
            alt={this.props.tags}
          />
          <div className="user-data">
            <img
              className="user-img"
              src={this.props.userImg ? this.props.userImg : icon}
              alt="User"
            />
            <h4>By: {this.props.user}</h4>
          </div>
        </div>
      </section>
    );
  }
}

export default Modal;