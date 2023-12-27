import "./EditWindow.css";
import PropTypes from "prop-types";
import { useState } from "react";

function EditWindow(props) {
  const oldDay = props.editDay + "";
  const oldDescription = props.editDescription + "";
  const [newDay, setNewDay] = useState(oldDay);
  const [newDescription, setNewDescription] = useState(oldDescription);
  const handleEditDayChange = (event) => {
    setNewDay(event.target.value);
  };
  const handleEditDescriptionChange = (event) => {
    setNewDescription(event.target.value);
  };
  return props.openEditWindow ? (
    <div className="window-wrapper">
      <h1>Edit This Task</h1>
      <button
        className="close-button"
        onClick={() => props.setOpenEditWindow(false)}
      >
        X
      </button>
      <div className="task-attributes">
        <h2>Completion Day</h2>
        <input
          type="date"
          value={newDay}
          onChange={handleEditDayChange}
        />
        <h2>Task Description</h2>
        <input
          type="text"
          value={newDescription}
          onChange={handleEditDescriptionChange}
        />
      </div>
      <button
        className="edit-button"
        onClick={() =>
          props.handleEditTask(
            oldDay,
            newDay,
            oldDescription,
            newDescription
          )
        }
      >
        Submit Edits
      </button>
      <button
        className="delete-button"
        // onClick={() => submitTask(completionDay, taskDescription, props.taskList, props.setOpenWindow)}
        onClick={() =>
          props.handleDeleteTask(props.editDay, props.editDescription)
        }
      >
        Delete Task
      </button>
    </div>
  ) : (
    ""
  );
}

EditWindow.propTypes = {
  handleDeleteTask: PropTypes.func,
  openEditWindow: PropTypes.bool,
  setOpenEditWindow: PropTypes.func,
  taskLists: PropTypes.object,
  handleEditTask: PropTypes.func,
  editDay: PropTypes.string,
  editDescription: PropTypes.string,
  setEditDay: PropTypes.func,
  setEditDescription: PropTypes.func,
};

export default EditWindow;
