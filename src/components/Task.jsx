import "./Task.css";
import PropTypes from "prop-types";

function Task({ description }) {
  {console.log(description)}
  return (
    <>
      <div className="task-box">
        <button className="ind-task-button">
          <p className="task-description"> {description}</p>
        </button>
      </div>
    </>
  );
}

Task.propTypes = {
  description: PropTypes.string,
};

export default Task;
