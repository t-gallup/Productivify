import "./EditWindow.css";
import PropTypes from "prop-types";

// TODO: Set task to open this window and pass in proper params
function EditWindow(props) {
  return props.openEditWindow ? (
    <div className="window-wrapper">
      <h1>Edit This Task</h1>
      <button
        className="close-button"
        onClick={() => props.setOpenEditWindow(false)}
      >
        X
      </button>
      TODO: Figure out how to pass in old value and change it if someone edits
      it
      {/* <div className="task-attributes">
            <h2>Completion Day</h2>
            <input type="date" value={completionDay} onChange={handleCompletionDayChange} />
            <h2>Task Description</h2>
            <input
              type="text"
              value={taskDescription}
              onChange={handleTaskDescriptionChange}
            />
          </div> */}
      <button className="edit-button" onClick={() => props.handleEditTask()}>
        Submit Edits
      </button>
      <button
        className="delete-button"
        // onClick={() => submitTask(completionDay, taskDescription, props.taskList, props.setOpenWindow)}
        onClick={() => props.handleDeleteTask(props)}
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
};

export default EditWindow;
