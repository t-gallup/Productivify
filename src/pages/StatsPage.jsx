import "./StatsPage.css";
import Navbar from "../components/Navbar.jsx";
import PropTypes from "prop-types";

function StatsPage(props) {
  return (
    <>
      <Navbar
        user={props.user}
        setUser={props.setUser}
        setTaskList={props.setTaskList}
        emptyTaskList={props.emptyTaskList}
        setToDoList={props.setToDoList}
      ></Navbar>
      <h1>Productivity Statistics Coming Soon</h1>
    </>
  );
}

StatsPage.propTypes = {
  user: PropTypes.object,
  setUser: PropTypes.func,
  setTaskList: PropTypes.func,
  emptyTaskList: PropTypes.object,
  setToDoList: PropTypes.func,
};
export default StatsPage;
