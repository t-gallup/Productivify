import { useState } from "react";
import "./NewTaskWindow.css";
import PropTypes from "prop-types";

// function submitTask(completionDay, taskDescription, taskList, setOpenWindow) {
//   const key = `${completionDay.substring(0, 4)}-${completionDay
//     .substring(5, 7)
//     .toString()
//     .padStart(2, "0")}-${completionDay
//     .substring(8, 10)
//     .toString()
//     .padStart(2, "0")}`;
//   console.log(key);
//   console.log(taskList)
//   if (taskList[key] !== undefined) {
//     taskList[key].push(taskDescription);
//   }
//   setOpenWindow(false);
// }

function NewTaskWindow(props) {
  const [completionDay, setCompletionDay] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const handleCompletionDayChange = (event) => {
    setCompletionDay(event.target.value);
  };
  const handleTaskDescriptionChange = (event) => {
    setTaskDescription(event.target.value);
  };
  return props.openWindow ? (
    <div className="window-wrapper">
      <h1>Add a New Task</h1>
      <button
        className="close-button"
        onClick={() => props.setOpenWindow(false)}
      >
        X
      </button>
      <div className="task-attributes">
        <h2>Completion Day</h2>
        <input type="date" value={completionDay} onChange={handleCompletionDayChange} />
        <h2>Task Description</h2>
        <input
          type="text"
          value={taskDescription}
          onChange={handleTaskDescriptionChange}
        />
      </div>
      <button
        className="submit-button"
        // onClick={() => submitTask(completionDay, taskDescription, props.taskList, props.setOpenWindow)}
        onClick={() => props.handleAddTask(completionDay, taskDescription)}
      >
        Submit
      </button>
    </div>
  ) : (
    ""
  );
}

NewTaskWindow.propTypes = {
  openWindow: PropTypes.bool,
  setOpenWindow: PropTypes.func,
  taskList: PropTypes.object,
  handleAddTask: PropTypes.func
};

export default NewTaskWindow;
