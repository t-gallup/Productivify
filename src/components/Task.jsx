import "./Task.css";
import PropTypes from "prop-types";


function handleEditButtonClick(description, day, setEditDay, setEditDescription, setOpenEditWindow) {
  setEditDay(day);
  setEditDescription(description)
  setOpenEditWindow(true);
}
function Task({ description, day, setEditDescription, setEditDay, setOpenEditWindow }) {
  return (
    <>
      <div className="task-box">
        <button className="ind-task-button" onClick={() => handleEditButtonClick(description, day, setEditDay, setEditDescription, setOpenEditWindow)}>
          <p className="task-description"> {description}</p>
        </button>
      </div>
    </>
  );
}

Task.propTypes = {
  description: PropTypes.string,
  day: PropTypes.string,
  setEditDescription: PropTypes.func,
  setEditDay: PropTypes.func,
  setOpenEditWindow: PropTypes.func,

};

export default Task;
