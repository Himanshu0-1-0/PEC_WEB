import DepartmentUpdatesButton from "./UpdateModal/DepartmentUpdatesButton";
import "./Updates.css"
import { useState } from "react";
import ManageAuthorityModal from "./ManageAuthorityModal/ManageAuthorityModal"
import { useAuth } from "../../../context/AuthContext";
export default function Updates() {
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
  const openUpdateModal = () => {
    setIsModalUpdateOpen(true);
  };

  const closeUpdateModal = () => {
    setIsModalUpdateOpen(false);
  };

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const openModal = () => {
    setIsAuthModalOpen(true);
  };

  const closeModal = () => {
    setIsAuthModalOpen(false);
  };
  const {isAuthority}=useAuth();

  return (
    <div className="updates-cont">
      <div className="updt-logo">
        <img src="/PEC_WEB.png" alt="Logo" />
      </div>
      <div className="updt-content">
        <div className="dd1">
            <h2>Explore Department Updates</h2>
        </div>
        <div className="dd2">
        <p>
            Don't miss out on important updates! Explore now to stay connected with your department and make the most of your time here.
        </p>
        </div>     
        <div className="updt-btn">
        <button type="button" className="btn " onClick={openUpdateModal}>Explore Department Updates.. </button>
        <DepartmentUpdatesButton isModalUpdateOpen={isModalUpdateOpen} closeUpdateModal={closeUpdateModal}/>
        </div>
        {isAuthority?
        <button type="button" className="btn btn-danger sasafwq"  onClick={openModal} >Manage Authority..</button>
      :undefined}
        <ManageAuthorityModal isOpen={isAuthModalOpen} onRequestClose={closeModal} />
      </div>
    </div>
  )
}
 