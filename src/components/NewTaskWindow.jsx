import { useState, useRef } from "react";
import "./NewTaskWindow.css";
import PropTypes from "prop-types";

function NewTaskWindow(props) {
  const [completionDay, setCompletionDay] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const submitButtonRef = useRef(null);
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "date") {
      setCompletionDay(value);
    }
    if (name === "taskDescription") {
      setTaskDescription(value);
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
    props.handleAddTask(dateValue, taskDescription);
    setCompletionDay("");
    setTaskDescription("");
  };

  return props.openWindow ? (
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
        </div>
        <button type="submit" className="submit-button" ref={submitButtonRef}>
          Submit
        </button>
      </form>
    </div>
  ) : (
    ""
  );
}

NewTaskWindow.propTypes = {
  openWindow: PropTypes.bool,
  setOpenWindow: PropTypes.func,
  taskList: PropTypes.object,
  handleAddTask: PropTypes.func,
};

export default NewTaskWindow;
