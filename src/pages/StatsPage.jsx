import "./StatsPage.css";
import Navbar from "../components/Navbar.jsx";
import PropTypes from "prop-types"

function StatsPage(props) {
  return (
    <>
    <Navbar user={props.user} handleSignOut={props.handleSignOut}></Navbar>
      <h1>Productivity Statistics Coming Soon</h1>
    </>
  );
}

Navbar.propTypes = {
    user: PropTypes.object,
    handleSignOut: PropTypes.func
};
export default StatsPage;
