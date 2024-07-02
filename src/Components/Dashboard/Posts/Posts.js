import "./Posts.css"
import { useAuth } from "../../../context/AuthContext";
import { AiOutlineLike } from "react-icons/ai";
import { AiTwotoneLike } from "react-icons/ai";
import { FaRegComments } from "react-icons/fa6";


export default function Posts() {
    const {currentUser} = useAuth();
  return (
    <div className="Posts-cont">
      <div className="one border-bottom">
       <div className="one-img">
        <img src={currentUser.photoURL} alt="Image..." />
       </div>
       <div className="one-cont">
        <div className="one-name">
            {currentUser.displayName}
        </div>
        <div className="one-time">
            20 Dec,2022 05:04 am
        </div>
       </div>
      </div>
      <div className="two">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut nesciunt porro aliquam totam harum, quasi odit optio consequuntur facilis praesentium modi consectetur ut maiores provident neque exercitationem ex cupiditate earum.
      </div>
      <div className="three">
        <img src="/Post.jpg" alt="Post_Img" />
      </div>
      <div className="four">
        <div className="num border-top border-bottom">
            <div className="likes">
                33 Likes
            </div>
            <div className="comments">
                10 Comments
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
