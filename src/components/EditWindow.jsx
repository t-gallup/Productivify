import "./EditWindow.css";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { handleEditTask, handleDeleteTask } from "../functions/TaskFunctions";

function EditWindow(props) {
  const oldDay = props.editDay + "";
  const oldDescription = props.editDescription[0] + "";
  const oldTime = Number(props.editDescription[1]);
  const [newDay, setNewDay] = useState(oldDay);
  const [newDescription, setNewDescription] = useState(oldDescription);
  const [newTime, setNewTime] = useState(oldTime);
  const handleEditDayChange = (event) => {
    setNewDay(event.target.value);
  };
  const handleEditDescriptionChange = (event) => {
    setNewDescription(event.target.value);
  };
  const handleEditTimeChange = (event) => {
    setNewTime(event.target.value);
  };
  useEffect(() => {
    setNewDay(props.editDay);
    setNewDescription(props.editDescription[0]);
    setNewTime(props.editDescription[1]);
  }, [props.editDay, props.editDescription]);
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
        <input type="date" value={newDay} onChange={handleEditDayChange} />
        <h2>Task Description</h2>
        <input
          type="text"
          value={newDescription}
          onChange={handleEditDescriptionChange}
        />
        <h2>Completion Time</h2>
        <input type="number" value={newTime} onChange={handleEditTimeChange} />
      </div>
      <button
        className="edit-button"
        onClick={() =>
          handleEditTask(
            oldDay,
            newDay,
            oldDescription,
            newDescription,
            oldTime,
            newTime,
            props.taskLists,
            props.setTaskLists,
            props.setOpenEditWindow,
            props.toDoList,
            props.setToDoList,
            props.isToDo
          )
        }
      >
        Submit Edits
      </button>
      <button
        className="delete-button"
        // onClick={() => submitTask(completionDay, taskDescription, props.taskList, props.setOpenWindow)}
        onClick={() =>
          handleDeleteTask(
            props.editDay,
            props.editDescription,
            props.taskLists,
            props.setTaskLists,
            props.setOpenEditWindow,
            props.toDoList,
            props.setToDoList,
            props.isToDo
          )
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
  openEditWindow: PropTypes.bool,
  setOpenEditWindow: PropTypes.func,
  taskLists: PropTypes.object,
  setTaskLists: PropTypes.func,
  editDay: PropTypes.string,
  editDescription: PropTypes.array,
  setEditDay: PropTypes.func,
  setEditDescription: PropTypes.func,
  toDoList: PropTypes.object,
  setToDoList: PropTypes.func,
  isToDo: PropTypes.bool,
};

export default EditWindow;
