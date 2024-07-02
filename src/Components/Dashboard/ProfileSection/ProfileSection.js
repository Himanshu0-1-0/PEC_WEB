import "./ProfileSection.css"
import { useAuth } from "../../../context/AuthContext";
import { Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg";

export default function ProfileSection() {
    const {currentUser} = useAuth();
  return (
    <div className="prof-co ">
      <div className="pro-photo">
        <img src={currentUser.photoURL} alt="Image..." />
      </div>
      <div className="pro-name">
        <div className="propro">{currentUser.displayName}</div>
        <div className="propro">{currentUser.email}</div>
      </div>
      <div className="visitprof">
        <Link to="/profile" className="cc">    
            <CgProfile className="abc"/>
            <div className="viv">View Profile</div>
        </Link>
      </div>
    </div>
  )
}
