import "./ToDoPage.css";
import PropTypes from "prop-types";
import Navbar from "../components/Navbar";

function ToDoPage(props) {
  return (
    <>
      <Navbar user={props.user} handleSignOut={props.handleSignOut}></Navbar>
      <h1>To Do Page Coming Soon</h1>
    </>
  );
}

ToDoPage.propTypes = {
  user: PropTypes.object,
  handleSignOut: PropTypes.func,
};

export default ToDoPage;
