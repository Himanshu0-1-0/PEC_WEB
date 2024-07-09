import "./MakePost.css"
import { useAuth } from "../../../context/AuthContext";
import { RiAddCircleLine } from "react-icons/ri";
import { useState } from "react";
import MakePostModal from "../MakePostModal/MakePostModal";

export default function MakePost() {
    const {currentUser} = useAuth();

    const [isMPModalOpen, setIsMPModalOpen] = useState(false);
    const openMPModal = () => setIsMPModalOpen(true);
    const closeMPModal = () => setIsMPModalOpen(false);
  

  return (
    <div className="make-cont">
      <div className="make-cont2">
        <div className="photu">
        <img src={currentUser.photoURL} alt="Image..." />
        </div>
        <div className="make">
            <RiAddCircleLine className="ppp"/>
            <MakePostModal isOpen={isMPModalOpen} onRequestClose={closeMPModal} />
            <button onClick={openMPModal} className="dadad">
            <div className="ssp">
                Make a Post..
            </div>
            </button>
        </div>
      </div>
    </div>
  )
}
