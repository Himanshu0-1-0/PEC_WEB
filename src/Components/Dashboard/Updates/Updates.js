import DepartmentUpdatesButton from "./UpdateModal/DepartmentUpdatesButton";
import "./Updates.css"
import { useState } from "react";

export default function Updates() {
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
  const openUpdateModal = () => {
    setIsModalUpdateOpen(true);
  };

  const closeUpdateModal = () => {
    setIsModalUpdateOpen(false);
  };

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
        <p >
            Don't miss out on important updates! Explore now to stay connected with your department and make the most of your time here.
        </p>
        </div>     
        <div className="updt-btn">
        <button type="button" className="btn " onClick={openUpdateModal}>Explore Department Updates.. </button>
        <DepartmentUpdatesButton isModalUpdateOpen={isModalUpdateOpen} closeUpdateModal={closeUpdateModal}/>
        </div>
        <button type="button" className="btn btn-danger">Manage Authority..</button>
      </div>
    </div>
  )
}
