import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Components/Signin/Signin';
import ProtectedRoute from './Components/Protection/Protection';
import Navbar from './Components/Navbar/Navbar';
import Dashboard from './Components/Dashboard/Dashboard';
import Home from './Components/Home/Home';
import DepartmentUpdates from './Components/DepartmentUpdates/DepartmentUpdates';
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
        </Route>
      </Routes>
    </Router>
   </>
  );
}

export default App;
