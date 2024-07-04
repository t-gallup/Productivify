import "./Navbar.css";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useContext } from "react";
import { ThemeContext } from "../ThemeProvider";

function Navbar(props) {
  const [{ theme, isDark }, changeTheme] = useContext(ThemeContext);
  const navigate = useNavigate();
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

  return (
    <div className="navbar big">
      <a className="name navbar-link" onClick={() => navigate("/")}>
        <h2>Productivify</h2>
      </a>
      {/* <a className="navbar-link hov" onClick={() => changeTheme()}>
        {" "}
        {isDark ? "Light" : "Dark"} Mode
      </a> */}
      <a className="navbar-link hov" onClick={() => navigate("/")}>
        {" "}
        Calendar View
      </a>
      <a className="navbar-link hov" onClick={() => navigate("/to-do")}>
        To Do List
      </a>
      <a className="navbar-link hov" onClick={() => navigate("/habit")}>
        Habit Tracker
      </a>
      <a className="navbar-link hov" onClick={() => navigate("/stats")}>
        Statistics
      </a>
      {props.user?.email ? (
        <a className="navbar-link hov" onClick={handleSignOut}>
          Sign Out
        </a>
      ) : (
        <a className="navbar-link hov" onClick={() => navigate("/sign-in")}>
          Sign In
        </a>
      )}
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
