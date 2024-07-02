import "./MakePost.css"
import { useAuth } from "../../../context/AuthContext";
import { RiAddCircleLine } from "react-icons/ri";

export default function MakePost() {
    const {currentUser} = useAuth();
  return (
    <div className="make-cont">
      <div className="make-cont2">
        <div className="photu">
        <img src={currentUser.photoURL} alt="Image..." />
        </div>
        <div className="make">
            <RiAddCircleLine className="ppp"/>
            <div className="ssp">
                Make a Post..
            </div>
        </div>
      </div>
    </div>
  )
}
