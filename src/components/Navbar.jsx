import "./Navbar.css";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

function Navbar(props) {
  const navigate = useNavigate();
  const handleSignOut = async () => {
    await signOut(auth);
    props.setTaskList(structuredClone(props.emptyTaskList));
    props.setToDoList(structuredClone(props.emptyTaskList));
    props.setUser(null);
    localStorage.setItem("userTaskList", JSON.stringify(props.emptyTaskList));
    localStorage.setItem("userToDo", JSON.stringify(props.emptyTaskList));
    localStorage.setItem("user", JSON.stringify(null));
    navigate("/");
  };

  return (
    <div className="navbar big">
      <a className="name navbar-link" onClick={() => navigate("/")}>
        <h2>Productivify</h2>
      </a>
      <a className="navbar-link hov" onClick={() => navigate("/")}>
        {" "}
        Calendar View
      </a>
      <a className="navbar-link hov" onClick={() => navigate("/to-do")}>
        To Do List
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
  emptyTaskList: PropTypes.object,
  setToDoList: PropTypes.func,
};

export default Navbar;
