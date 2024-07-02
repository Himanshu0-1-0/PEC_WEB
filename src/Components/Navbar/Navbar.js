import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { getAuth, signOut } from "firebase/auth";
import { FaHome } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { IoIosLogIn } from "react-icons/io";
import { IoIosLogOut } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import "./Navbar.css";

const Navbar = () => {
  const { currentUser } = useAuth();

  const handleLogout = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      console.log("User signed out successfully");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <nav className="nav-cont ">
      <div className="nav-logo">
        <img src="/PEC_WEB.png" alt="img" />
      </div>
      <div className="nav-icons">
        <ul className="nav-ul">
          <li className="nav-li">
            <Link to="/" className="navico ss">
              <FaHome className="nav-pho" />
              <div className="ss">
                Home
              </div>
            </Link>
          </li>
          {currentUser ? (
            <>
              <li className="nav-li">
                <Link to="/dashboard" className="navico ss">
                  <MdDashboard className="nav-pho" />
                  <div className="ss">
                    DashBoard
                  </div>
                </Link>
              </li>
              <li className="nav-li">
            <Link to="/profile" className="navico ss">
              <CgProfile className="nav-pho" />
              <div className="ss">
                Profile
              </div>
            </Link>
          </li>
              <li className="nav-li">
                <button onClick={handleLogout}  className="navico nav-log">
                  <IoIosLogOut className="nav-pho" />
                  <div className="">
                    LogOut
                  </div>
                </button>
              </li>
            </>
          ) : (
            <li className="nav-li">
              <Link to="/login" className="navico ss">
                <IoIosLogIn className="nav-pho" />
                <div className="ss">
                  LogIn
                </div>
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
