import "./MakePostModal.css";
import { useRef } from "react";
import Modal from "react-modal";
import { db, storage } from "../../../firebase"; // Import Firebase and Firestore references
import { addDoc, collection, doc, updateDoc,getDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useAuth } from "../../../context/AuthContext";
import { useParams } from "react-router-dom";
// import { LuFolderMinus } from "react-icons/lu";
// import { TbLayoutGridRemove } from "react-icons/tb";

Modal.setAppElement("#root");

export default function MakePostModal({ isOpen, onRequestClose }) {
  const captionRef = useRef(null);
  const photoRef = useRef(null);
  const { department, year } = useParams();

  const { currentUser } = useAuth();

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

  <Modal isOpen={isOpen} onRequestClose={onRequestClose} style={customStyles}>
    {/* modal content */}
  </Modal>;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const caption = captionRef.current.value;
    const photo = photoRef.current.files[0];
    console.log("Caption:", caption);
    console.log("Photo:", photo);

    try {
      const uniqueFilename = `${currentUser.uid}_${Date.now()}_${photo.name}`;

      const storageRef = ref(storage, `images/${uniqueFilename}`);
      await uploadBytes(storageRef, photo);
      console.log("file uploaded");

      const photoUrl = await getDownloadURL(storageRef);

      const postRef = await addDoc(collection(db, "posts"), {
        caption: caption,
        photoUrl: photoUrl,
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
      console.log("Post added successfully with ID:", postId);

      
      if (department && year) {
        await addDoc(collection(db, "department_updates"), {
          department: department,
          year: year,
          post: postId,
        });
        console.log("Department update added successfully");
      }else{
        // Update user's posts array
      const userRef = doc(db, "users", currentUser.uid);

      const userDoc = await getDoc(userRef);
      const userPosts = userDoc.data().posts || []; // Ensure posts is an array

      await updateDoc(userRef, {
        posts: [...userPosts, postId],
      });
      console.log("User's posts array updated successfully");

      }

      e.target.reset();
      onRequestClose();
    } catch (error) {
      console.error("Error adding post:", error.message);
      // Handle error appropriately, e.g., show a message to the user
    }
  };

  return (
    <div>
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        style={customStyles}
      >
        <h2>Make a Post</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Caption:</label>
            <textarea ref={captionRef} />
          </div>
          <div>
            <label>Photo:</label>
            <input type="file" ref={photoRef} />
          </div>
          <button type="submit">Post</button>
          <button type="button" onClick={onRequestClose}>
            Cancel
          </button>
        </form>
      </Modal>
    </div>
  );
}
