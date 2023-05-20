import React, { Component } from "react";
import "./App.css";
import "./reset.css";
import Modal from "./Modal.js";

class Gallery extends Component {
  constructor() {
    super();
    this.state = {
      isOpen: false,
      selsctedImage: "",
      selectedUserImage: "",
      userName: "",
      imigeTags: ""
    };
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }

  showModal = (image, userImg, user, tags) => {
    this.setState({
      isOpen: true,
      selsctedImage: image,
      selectedUserImage: userImg,
      userName: user,
      imigeTags: tags
    });
  };

  hideModal = () => {
    this.setState({ isOpen: false });
  };

  render() {
    const { images } = this.props;
    return (
      <section>
        <div id="bg-img">
          <h2>Stunning Images</h2>
          <h3>Photos shared by our generous community</h3>
        </div>

        <div className="gallery">
          <figure className="gallery-item">
            {images
              ? images.map(image => {
                  return (
                    <img
                      onClick={() =>
                        this.showModal(
                          image.image,
                          image.userImg,
                          image.user,
                          image.tags
                        )
                      }
                      className="gallery-img"
                      src={image.image}
                      key={image.id}
                      alt={image.tags}
                    />
                  );
                })
              : ""}
          </figure>
        </div>
        <Modal
          tags={this.state.imigeTags}
          user={this.state.userName}
          userImg={this.state.selectedUserImage}
          image={this.state.selsctedImage}
          isOpen={this.state.isOpen}
          onClose={this.hideModal}
        />
      </section>
    );
  }
}

export default Gallery;