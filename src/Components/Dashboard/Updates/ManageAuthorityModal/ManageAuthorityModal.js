import "./ManageAuthorityModal.css";
import React, { useState } from 'react';
import Modal from 'react-modal';
import { db } from '../../../../firebase';
import { collection, query, where, getDocs, doc, updateDoc } from 'firebase/firestore';

Modal.setAppElement('#root'); // Make sure this matches your app root element

const ManageAuthorityModal = ({ isOpen, onRequestClose }) => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleAuthorityUpdate = async () => {
    setMessage('Loading...');
    try {
      const usersRef = collection(db, 'users');
      const q = query(usersRef, where('email', '==', email));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        setMessage('User with this email does not exist.');
        return;
      }

      const userDoc = querySnapshot.docs[0];
      const userRef = doc(db, 'users', userDoc.id);

      await updateDoc(userRef, {
        authorities: true,
      });

      setMessage('User authority updated successfully.');
    } catch (error) {
      setMessage(`Error updating authority: ${error.message}`);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="ModalContent"
      overlayClassName="ModalOverlay"
    >
      <h2>Manage Authority</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleAuthorityUpdate();
        }}
      >
        <div>
          <label>Email:</label>
          <input
            type="email"
            placeholder="Enter user email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <button type="submit">Update Authority</button>
        <button type="button" onClick={onRequestClose}>
          Cancel
        </button>
      </form>
      {message && <p>{message}</p>}
    </Modal>
  );
};

export default ManageAuthorityModal;
