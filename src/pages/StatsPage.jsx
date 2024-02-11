import "./StatsPage.css";
import Navbar from "../components/Navbar.jsx";
import PropTypes from "prop-types"

function StatsPage(props) {
  return (
    <>
    <Navbar user={props.user} setTaskLists={props.setTaskLists} emptyTaskLists={props.emptyTaskLists} ></Navbar>
      <h1>Productivity Statistics Coming Soon</h1>
    </>
  );
}

StatsPage.propTypes = {
    user: PropTypes.object,
    setTaskLists: PropTypes.func,
    emptyTaskLists: PropTypes.object,
};
export default StatsPage;
