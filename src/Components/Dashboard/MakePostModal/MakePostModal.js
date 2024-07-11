import "./MakePostModal.css";
import { useRef, useState } from "react";
import Modal from "react-modal";
import { db, storage } from "../../../firebase"; // Import Firebase and Firestore references
import { addDoc, collection, doc, updateDoc, getDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useAuth } from "../../../context/AuthContext";
import { useParams } from "react-router-dom";

Modal.setAppElement("#root");

export default function MakePostModal({ isOpen, onRequestClose }) {
  const captionRef = useRef(null);
  const photoRef = useRef(null);
  const { department, year } = useParams();
  const { currentUser } = useAuth();
  const [message, setMessage] = useState('');

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const caption = captionRef.current.value.trim();
    const photo = photoRef.current.files[0];

    if (!caption && !photo) {
      setMessage("Please provide either a caption or a photo.");
      return;
    }

    try {
      setMessage("Posting....");
      let photoUrl = "";
      if (photo) {
        const uniqueFilename = `${currentUser.uid}_${Date.now()}_${photo.name}`;
        const storageRef = ref(storage, `images/${uniqueFilename}`);
        await uploadBytes(storageRef, photo);
        photoUrl = await getDownloadURL(storageRef);
      }

      const postRef = await addDoc(collection(db, "posts"), {
        caption: caption || "",
        photoUrl: photoUrl || "",
        timestamp: new Date(),
        likes: [],
        comments: [],
        postedBy: {
          _id: currentUser.uid,
          name: currentUser.displayName,
          profilePic: currentUser.photoURL,
        },
      });
      const postId = postRef.id;

      if (department && year) {
        await addDoc(collection(db, "department_updates"), {
          department: department,
          year: year,
          post: postId,
        });
      } else {
        // Update user's posts array
        const userRef = doc(db, "users", currentUser.uid);
        const userDoc = await getDoc(userRef);
        const userPosts = userDoc.data().posts || [];

        await updateDoc(userRef, {
          posts: [...userPosts, postId],
        });
      }

      e.target.reset();
      onRequestClose();
      setMessage(""); // Clear the message
    } catch (error) {
      console.error("Error adding post:", error.message);
      setMessage(`Error adding post: ${error.message}`);
    }
  };

  return (
    <div>
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        style={customStyles}
        className="MakePostModal"
        overlayClassName="MakePostModalOverlay"
      >
        <h2 className="modal-title">Make a Post</h2>
        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label className="form-label">Caption:</label>
            <textarea ref={captionRef} className="form-input" />
          </div>
          <div className="form-group">
            <label className="form-label">Photo:</label>
            <input type="file" ref={photoRef} className="form-input" />
          </div>
          <div className="form-buttons">
            <button type="submit" className="form-button submit-button">
              Post
            </button>
            <button
              type="button"
              onClick={onRequestClose}
              className="form-button cancel-button"
            >
              Cancel
            </button>
          </div>
        </form>
        {message && <p className="message">{message}</p>}
      </Modal>
    </div>
  );
}
