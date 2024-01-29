import "./Navbar.css";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

function Navbar(props) {
  const navigate = useNavigate();
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
        <a className="navbar-link hov" onClick={props.handleSignOut}>
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
    handleSignOut: PropTypes.func
}

export default Navbar;
