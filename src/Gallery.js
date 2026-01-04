import React from "react";
import "./App.css";
import Modal from "./Modal.js";

const Gallery = ({ images }) => {
  const [modalState, setModalState] = React.useState({
    isOpen: false,
    selectedImage: "",
    selectedUserImage: "",
    userName: "",
    imageTags: ""
  });

  const showModal = (image, userImg, user, tags) => {
    setModalState({
      isOpen: true,
      selectedImage: image,
      selectedUserImage: userImg,
      userName: user,
      imageTags: tags
    });
  };

  const hideModal = () => {
    setModalState(prev => ({ ...prev, isOpen: false }));
  };

  return (
    <section>
      <div className="gallery">
        <figure className="gallery-item">
          {images && images.map(image => (
            <img
              onClick={() =>
                showModal(
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
          ))}
        </figure>
      </div>
      <Modal
        tags={modalState.imageTags}
        user={modalState.userName}
        userImg={modalState.selectedUserImage}
        image={modalState.selectedImage}
        isOpen={modalState.isOpen}
        onClose={hideModal}
      />
    </section>
  );
};

export default Gallery;