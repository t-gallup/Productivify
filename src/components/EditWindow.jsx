import "./EditWindow.css";
import PropTypes from "prop-types";
import { useState } from "react";

// TODO: Set task to open this window and pass in proper params
function EditWindow(props) {
  const handleNewDayChange = (event) => {
    setNewDay(event.target.value);
  };
  const handleNewDescriptionChange = (event) => {
    setNewDescription(event.target.value);
  };
  const oldDay = props.editDay + "";
  const oldDescription = props.editDescription + "";
  const [newDay, setNewDay] = useState(oldDay);
  const [newDescription, setNewDescription] = useState(oldDescription);
  return props.openEditWindow ? (
    <div className="window-wrapper">
      <h1>Edit This Task</h1>
      <button
        className="close-button"
        onClick={() => props.setOpenEditWindow(false)}
      >
        X
      </button>
      {/* // TODO: Figure out how to pass in old value and change it if someone edits it */}
      <div className="task-attributes">
        <h2>Completion Day</h2>
        <input
          type="date"
          value={newDay}
          onChange={handleNewDayChange}
        />
        <h2>Task Description</h2>
        <input
          type="text"
          value={newDescription}
          onChange={handleNewDescriptionChange}
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
  editDay: PropTypes.object,
  editDescription: PropTypes.string,
  setEditDay: PropTypes.func,
  setEditDescription: PropTypes.func,
};

export default EditWindow;
