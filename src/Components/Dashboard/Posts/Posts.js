import "./Posts.css";
import { useAuth } from "../../../context/AuthContext";
import { AiOutlineLike } from "react-icons/ai";
import { AiTwotoneLike } from "react-icons/ai";
import { FaRegComments } from "react-icons/fa6";
import { db } from "../../../firebase";
import { doc, updateDoc } from "firebase/firestore";
import debounce from "lodash.debounce";
import { useState, useEffect, useCallback, useRef } from "react";
import Comment from "./Comment/Comment";
import { v4 as uuidv4 } from "uuid";
import LikesModal from "./LikesModal/LikesModal";

export default function Posts({
  id,
  caption,
  postedBy,
  timestamp,
  photoUrl,
  likes,
  comments,
}) {
  
  const { currentUser } = useAuth();
  const formattedTimestamp = timestamp && timestamp.seconds
    ? new Date(timestamp.seconds * 1000).toLocaleString()
    : "Unknown Date";
  const [likeCount, setLikeCount] = useState(likes.length);
  const [liked, setLiked] = useState(false);

  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState(null);
  const [commentCount, setCommentCount] = useState(comments.length);
  const commentInputRef = useRef(null);

  const [isModalOpen, setIsModalOpen] = useState(false);


  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };


  //handling comments

  useEffect(() => {
    setNewComment(comments);
  }, []);

  const handleCommentClick = () => {
    setShowComments((prev) => {
      return !prev;
    });
  };

  const handleCommentSubmit = async () => {
    const commentText = commentInputRef.current.value;
    if (!commentText) return;

    const commentId = uuidv4();
    const newCommentObj = {
      id: commentId,
      text: commentText,
      timestamp: new Date(),
      postedBy: {
        name: currentUser.displayName,
        profilePic: currentUser.photoURL,
      },
    };

    try {
      const postRef = doc(db, "posts", id);
      await updateDoc(postRef, {
        comments: [newCommentObj, ...newComment],
      });

      setNewComment((prevComments) => [newCommentObj, ...prevComments]);
      setCommentCount((prevCount) => prevCount + 1);
      commentInputRef.current.value = "";
    } catch (error) {
      console.error("Error adding comment:", error.message);
    }
  };

  //handling likes
  useEffect(() => {
    setLiked(likes.some((like) => like.uid === currentUser.uid));
  }, [likes, currentUser.uid]);

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount((prevCount) => (liked ? prevCount - 1 : prevCount + 1));
    debounceUpdateLikes();
  };

  const debounceUpdateLikes = useCallback(
    debounce(async () => {
      const postRef = doc(db, "posts", id);
      const likeObj = {
        name: currentUser.displayName,
        uid: currentUser.uid,
        photo: currentUser.photoURL,
      };

      try {
        if (liked) {
          await updateDoc(postRef, {
            likes: likes.filter((like) => like.uid !== currentUser.uid),
          });
        } else {
          await updateDoc(postRef, {
            likes: [...likes, likeObj],
          });
        }
      } catch (error) {
        console.error("Error updating likes:", error.message);
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
          <div className="one-name">{postedBy.name}</div>
          <div className="one-time">{formattedTimestamp}</div>
        </div>
      </div>
      <div className="two">{caption}</div>
      <div className="three">
      {photoUrl?<img src={photoUrl} alt="Post_Img" />:undefined}
      </div>
      <div className="four">
        <div className="num border-top border-bottom">
          <div className="likes" onClick={openModal}>{likeCount} Likes</div>
          <LikesModal isOpen={isModalOpen} onRequestClose={closeModal} likes={likes} />
          <div className="comments">{commentCount} Comments</div>
        </div>
        <div className="icos">
          <div className="lik">
            <button onClick={handleLike} className="saasa">
              {liked ?<AiTwotoneLike className="iccc" />: <AiOutlineLike className="iccc" /> }
            </button>
          </div>
          <button onClick={handleCommentClick}  className="saasa">
            <div className="com">
              <FaRegComments className="iccc" />
            </div>
          </button>
        </div>
      </div>
      {showComments && (
        <div className="five">
          <div className="inp-box">
            <div className="input-group mb-3 container">
              <input
                type="text"
                className="form-control ippi"
                placeholder="Type Here!.."
                aria-label="Recipient's username"
                aria-describedby="button-addon2"
                ref={commentInputRef}
              />
              <button
                className="btn btn-outline-secondary jdj "
                type="button"
                id="button-addon2"
                onClick={handleCommentSubmit}
              >
                Comment.
              </button>
            </div>
          </div>
          <div className="coms">
            {newComment.map((comment) => (
              <Comment
                key={comment.id}
                profilePic={comment.postedBy.profilePic}
                name={comment.postedBy.name}
                content={comment.text}
                timestamp={comment.timestamp}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
