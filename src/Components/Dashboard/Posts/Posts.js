import "./Posts.css"
import { useAuth } from "../../../context/AuthContext";
import { AiOutlineLike } from "react-icons/ai";
// import { AiTwotoneLike } from "react-icons/ai";
import { FaRegComments } from "react-icons/fa6";
import {db} from "../../../firebase";
import { doc, updateDoc } from 'firebase/firestore';
import debounce from 'lodash.debounce';
import { useState,useEffect ,useCallback} from "react";

export default function Posts({id,caption,postedBy,timestamp,photoUrl,likes,comments}) {
    const {currentUser} = useAuth();
    const formattedTimestamp = new Date(timestamp.seconds * 1000).toLocaleString();

    const [likeCount, setLikeCount] = useState(likes.length);
    const [liked, setLiked] = useState(false);

    useEffect(() => {

      setLiked(likes.some(like => like.uid === currentUser.uid));
    }, [likes, currentUser.uid]);

    const handleLike = () => {
      setLiked(!liked);
      setLikeCount(prevCount => (liked ? prevCount - 1 : prevCount + 1));
      debounceUpdateLikes();
    };

    const debounceUpdateLikes = useCallback(
      debounce(async () => {
        const postRef = doc(db, 'posts', id);
        const likeObj = {
          name: currentUser.displayName,
          uid: currentUser.uid,
          photo: currentUser.photoURL
        };
  
        try {
          if (liked) {
            await updateDoc(postRef, {
              likes: likes.filter(like => like.uid !== currentUser.uid)
            });
          } else {
            await updateDoc(postRef, {
              likes: [...likes, likeObj]
            });
          }
        } catch (error) {
          console.error('Error updating likes:', error.message);
        }
      }, 1000), // 1 second debounce
      [liked, id, currentUser, likes]
    );

    
  return (
    <div className="Posts-cont">
      <div className="one border-bottom">
       <div className="one-img">
        <img src={postedBy.profilePic} alt="Image..." />
       </div>
       <div className="one-cont">
        <div className="one-name">
            {postedBy.name}
        </div>
        <div className="one-time">
            {formattedTimestamp}
        </div>
       </div>
      </div>
      <div className="two">
        {caption}
       </div>
      <div className="three">
        <img src={photoUrl} alt="Post_Img" />
      </div>
      <div className="four">
        <div className="num border-top border-bottom">
            <div className="likes">
                {likeCount} Likes
            </div>
            <div className="comments">
                {comments.length} Comments
            </div>
        </div>
        <div className="icos">
            <div className="lik" >
              <button onClick={handleLike}>
              <AiOutlineLike className="iccc"/>
              </button>
            </div>
            <div className="com">
                <FaRegComments className="iccc"/>
            </div>
        </div>
      </div>
      <div className="five">

      </div>
    </div>
  )
}
