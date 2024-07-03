import "./Posts.css"
// import { useAuth } from "../../../context/AuthContext";
import { AiOutlineLike } from "react-icons/ai";
// import { AiTwotoneLike } from "react-icons/ai";
import { FaRegComments } from "react-icons/fa6";


export default function Posts({caption,postedBy,timestamp,photoUrl,likes,comments}) {
    // const {currentUser} = useAuth();
    const formattedTimestamp = new Date(timestamp.seconds * 1000).toLocaleString();
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
                {likes.length} Likes
            </div>
            <div className="comments">
                {comments.length} Comments
            </div>
        </div>
        <div className="icos">
            <div className="lik">
                <AiOutlineLike className="iccc"/>
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
