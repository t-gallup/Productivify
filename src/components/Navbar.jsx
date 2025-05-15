import "./Navbar.css";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useState } from "react";

function Navbar(props) {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  
  const handleSignOut = async () => {
    await signOut(auth);
    const emptyDict = {};
    props.setTaskList(structuredClone(emptyDict));
    props.setToDoList(structuredClone(emptyDict));
    props.setHabitList(structuredClone(emptyDict));
    props.setUser(null);
    localStorage.setItem("userTaskList", JSON.stringify(emptyDict));
    localStorage.setItem("userToDo", JSON.stringify(emptyDict));
    localStorage.setItem("userHabit", JSON.stringify(emptyDict));
    localStorage.setItem("user", JSON.stringify(null));
    navigate("/");
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleNavClick = (path) => {
    navigate(path);
    setMenuOpen(false);
  };

  return (
    <div className="navbar">
      <a className="name navbar-link" onClick={() => navigate("/")}>
        <h2>Productivify</h2>
      </a>
      
      <div className="hamburger-menu" onClick={toggleMenu}>
        <div className={`hamburger-line ${menuOpen ? 'open' : ''}`}></div>
        <div className={`hamburger-line ${menuOpen ? 'open' : ''}`}></div>
        <div className={`hamburger-line ${menuOpen ? 'open' : ''}`}></div>
      </div>
      
      <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
        <a className="navbar-link hov" onClick={() => handleNavClick("/")}>
          Calendar View
        </a>
        <a className="navbar-link hov" onClick={() => handleNavClick("/to-do")}>
          To Do List
        </a>
        <a className="navbar-link hov" onClick={() => handleNavClick("/habit")}>
          Habit Tracker
        </a>
        <a className="navbar-link hov" onClick={() => handleNavClick("/stats")}>
          Statistics
        </a>
        {props.user?.email ? (
          <a className="navbar-link hov" onClick={handleSignOut}>
            Sign Out
          </a>
        ) : (
          <a className="navbar-link hov" onClick={() => handleNavClick("/sign-in")}>
            Sign In
          </a>
        )}
      </div>
    </div>
  );
}

Navbar.propTypes = {
  user: PropTypes.object,
  setUser: PropTypes.func,
  setTaskList: PropTypes.func,
  setToDoList: PropTypes.func,
  setHabitList: PropTypes.func,
};

export default Navbar;