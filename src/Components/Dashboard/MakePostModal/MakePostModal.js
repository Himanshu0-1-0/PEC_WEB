import "./MakePostModal.css"
import  { useRef } from 'react';
import Modal from 'react-modal';
import { db, storage } from '../../../firebase'; // Import Firebase and Firestore references
import { doc, setDoc ,addDoc,collection} from 'firebase/firestore';
import { ref, uploadBytes,getDownloadURL } from 'firebase/storage';
import {useAuth} from "../../../context/AuthContext"
 
Modal.setAppElement('#root');

export default function MakePostModal({ isOpen, onRequestClose }) {
    const captionRef = useRef(null);
    const photoRef = useRef(null);

    const{currentUser} = useAuth();

    const customStyles = {
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
        },
      };
      
      <Modal isOpen={isOpen} onRequestClose={onRequestClose} style={customStyles}>
        {/* modal content */}
      </Modal>
      

    const handleSubmit = async (e) => {
        e.preventDefault();
        const caption = captionRef.current.value;
        const photo = photoRef.current.files[0];
        console.log('Caption:', caption);
        console.log('Photo:', photo);

        try {
            const uniqueFilename = `${currentUser.uid}_${Date.now()}_${photo.name}`;

            const storageRef = ref(storage, `images/${uniqueFilename}`);
            await uploadBytes(storageRef, photo);
            console.log("file uploaded");

            const photoUrl = await getDownloadURL(storageRef);

            addDoc(collection(db, "posts"), {
                caption: caption,
                photoUrl: photoUrl,
                timestamp: new Date(),
                likes: [],
                comments: [],
                postedBy: currentUser.uid
              })
              .then(() => {
                alert('Post submitted 👍' );
              })
              .catch((error) => {
                console.log(error.message);
              });

            // const postsCollectionRef =db.collection('posts');; 
            // const newPostRef = doc(postsCollectionRef);
            // await setDoc(newPostRef, {
            //     caption: caption,
            //     photoUrl: photoUrl,
            //     timestamp: new Date(),
            //     likes: [],
            //     comments: [],
            //     postedBy: currentUser.uid
            //   });
      
            console.log('Post added successfully');
      
            // Reset form
            e.target.reset();
            onRequestClose();
          } catch (error) {
            console.error('Error adding post:', error.message);
            // Handle error appropriately, e.g., show a message to the user
          }
      };

      
  return (
    <div>
         <Modal isOpen={isOpen} onRequestClose={onRequestClose} style={customStyles}>
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
        <button type="button" onClick={onRequestClose}>Cancel</button>
      </form>
    </Modal>
    </div>
  )
}
