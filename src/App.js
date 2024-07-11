import React from 'react';
import "./App.css"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Components/Signin/Signin';
import ProtectedRoute from './Components/Protection/Protection';
import Navbar from './Components/Navbar/Navbar';
import Dashboard from './Components/Dashboard/Dashboard';
import Home from './Components/Home/Home';
import DepartmentUpdates from './Components/DepartmentUpdates/DepartmentUpdates';
import UserProfile from './Components/UserProfile/UserProfile';
function App() {
  return (
   <>
    <Router>
      <Navbar/>
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/updates/:department/:year" element={<DepartmentUpdates/>}/>
          <Route path="/profile" element={<UserProfile />} />
        </Route>
      </Routes>
    </Router>
   </>
  );
}

export default App;
