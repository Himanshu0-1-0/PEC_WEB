import "./DepartmentalUpdates.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";

Modal.setAppElement('#root'); // Set the app root element for accessibility

const departments = ["CSE", "ECE", "EE", "MECH", "METALLURGY", "CIVIL","AEROSPACE","PRODUCTION"];
const currentYear = new Date().getFullYear();
const years = Array.from({ length: 5 }, (_, i) => currentYear + i);

const DepartmentUpdatesButton = ({ isModalUpdateOpen, closeUpdateModal }) => {
  const [selectedDepartment, setSelectedDepartment] = useState(departments[0]);
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const navigate = useNavigate();

  const handleDepartmentChange = (event) => {
    setSelectedDepartment(event.target.value);
  };

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  const handleSubmit = () => {
    navigate(`/updates/${selectedDepartment}/${selectedYear}`);
    closeUpdateModal();
  };

  return (
    <div>
      <Modal
        isOpen={isModalUpdateOpen}
        onRequestClose={closeUpdateModal}
        contentLabel="Select Department and Year"
        className="Modal"
        overlayClassName="Overlay"
      >
        <h2>Select Department and Year</h2>
        <div>
          <label>
            Department:
            <select value={selectedDepartment} onChange={handleDepartmentChange}>
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </label>
        </div>
        <div>
          <label>
            Year:
            <select value={selectedYear} onChange={handleYearChange}>
              {years.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </label>
        </div>
        <button onClick={handleSubmit}>Submit</button>
        <button onClick={closeUpdateModal}>Cancel</button>
      </Modal>
    </div>
  );
};

export default DepartmentUpdatesButton;
