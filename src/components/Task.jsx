import "./Task.css";
import PropTypes from "prop-types";

function Task({ description }) {
  {console.log(description)}
  return (
    <>
      <div className="task-box">
        <p className="task-description"> {description}</p>
      </div>
    </>
  );
}

Task.propTypes = {
  description: PropTypes.string,
};

export default Task;
