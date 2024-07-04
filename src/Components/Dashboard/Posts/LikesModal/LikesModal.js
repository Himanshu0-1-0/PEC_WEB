// LikesModal.js
import React from "react";
import Modal from "react-modal";
import "./LikesModal.css"

Modal.setAppElement('#root'); // Set the app root element for accessibility

const LikesModal = ({ isOpen, onRequestClose, likes }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Likes Modal"
      className="LikesModal"
      overlayClassName="LikesModalOverlay"
    >
      <h2>Likes</h2>
      <button onClick={onRequestClose}>Close</button>
      <ul>
        {likes.map((like) => (
          <li key={like.uid}>
            <img src={like.photo} alt={`${like.name}'s profile`} />
            <span>{like.name}</span>
          </li>
        ))}
      </ul>
    </Modal>
  );
};

export default LikesModal;
