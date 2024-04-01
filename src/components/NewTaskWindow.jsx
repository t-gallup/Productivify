import { useState, useRef } from "react";
import "./NewTaskWindow.css";
import PropTypes from "prop-types";
import { handleAddTask } from "../functions/TaskFunctions";

function NewTaskWindow(props) {
  const [completionDay, setCompletionDay] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [completionTime, setCompletionTime] = useState(0);
  const submitButtonRef = useRef(null);
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "date") {
      setCompletionDay(value);
    }
    if (name === "taskDescription") {
      setTaskDescription(value);
    }
    if (name === "completionTime") {
      setCompletionTime(value);
    }
  };

  const handleEnterPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      submitButtonRef.current.click();
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const dateValue = event.target.elements.date.value;
    handleAddTask(
      dateValue,
      taskDescription,
      completionTime,
      props.taskList,
      props.setTaskList,
      props.setOpenWindow,
      props.toDoList,
      props.setToDoList,
      props.isToDo
    );
    setCompletionDay("");
    setTaskDescription("");
    setCompletionTime(0);
  };

  return props.openWindow ? (
    props.isToDo ? (
      <div className="window-wrapper">
        <form onSubmit={handleSubmit}>
          <h1>Add a New To Do Item</h1>
          <button
            className="close-button"
            onClick={() => props.setOpenWindow(false)}
          >
            X
          </button>
          <div className="task-attributes">
            <h2>Desired Completion Day</h2>
            <input
              type="date"
              name="date"
              value={completionDay}
              onChange={handleInputChange}
              onKeyDown={handleEnterPress}
            />
            <h2>Task Description</h2>
            <input
              type="text"
              name="taskDescription"
              value={taskDescription}
              onChange={handleInputChange}
              onKeyDown={handleEnterPress}
            />
            <h2>Estimated Completion Time</h2>
            <input
              type="number"
              name="completionTime"
              value={completionTime}
              onChange={handleInputChange}
              onKeyDown={handleEnterPress}
            />
          </div>

          <button type="submit" className="submit-button" ref={submitButtonRef}>
            Submit
          </button>
        </form>
      </div>
    ) : (
      <div className="window-wrapper">
        <form onSubmit={handleSubmit}>
          <h1>Add a New Task</h1>
          <button
            className="close-button"
            onClick={() => props.setOpenWindow(false)}
          >
            X
          </button>
          <div className="task-attributes">
            <h2>Completion Day</h2>
            <input
              type="date"
              name="date"
              value={completionDay}
              onChange={handleInputChange}
              onKeyDown={handleEnterPress}
            />
            <h2>Task Description</h2>
            <input
              type="text"
              name="taskDescription"
              value={taskDescription}
              onChange={handleInputChange}
              onKeyDown={handleEnterPress}
            />
            <h2>Completion Time</h2>
            <input
              type="number"
              name="completionTime"
              value={completionTime}
              onChange={handleInputChange}
              onKeyDown={handleEnterPress}
            />
          </div>

          <button type="submit" className="submit-button" ref={submitButtonRef}>
            Submit
          </button>
        </form>
      </div>
    )
  ) : (
    ""
  );
}

NewTaskWindow.propTypes = {
  openWindow: PropTypes.bool,
  setOpenWindow: PropTypes.func,
  taskList: PropTypes.object,
  setTaskList: PropTypes.func,
  toDoList: PropTypes.object,
  setToDoList: PropTypes.func,
  isToDo: PropTypes.bool,
};

export default NewTaskWindow;
