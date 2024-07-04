import { useState, useRef } from "react";
import "./NewTaskWindow.css";
import PropTypes from "prop-types";
import { handleAddTask, handleAddHabit } from "../functions/TaskFunctions";
import { DateToKey } from "../functions/DateChanges";

function NewTaskWindow(props) {
  const [taskDescription, setTaskDescription] = useState("");
  const [completionTime, setCompletionTime] = useState(0);
  const submitButtonRef = useRef(null);
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "date") {
      props.setWindowDay(value);
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
    if (props.isHabit) {
      handleAddHabit(
        taskDescription,
        completionTime,
        props.habitList,
        props.setHabitList,
        props.setOpenWindow
      );
    } else {
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
    }

    props.setWindowDay(DateToKey(new Date()));
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
            onClick={() => {
              props.setOpenWindow(false);
              props.setWindowDay(DateToKey(new Date()));
            }}
          >
            X
          </button>
          <div className="task-attributes">
            <h2>Desired Completion Day</h2>
            <input
              type="date"
              name="date"
              value={props.windowDay}
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
    ) : props.isHabit ? (
      <div className="window-wrapper">
        <form onSubmit={handleSubmit}>
          <h1>Add a New Habit</h1>
          <button
            className="close-button"
            onClick={() => {
              props.setOpenWindow(false);
              props.setWindowDay(DateToKey(new Date()));
            }}
          >
            X
          </button>
          <div className="task-attributes">
            <h2>Habit Description</h2>
            <input
              type="text"
              name="taskDescription"
              value={taskDescription}
              onChange={handleInputChange}
              onKeyDown={handleEnterPress}
            />
            <h2>Habit Time per Day</h2>
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
            onClick={() => {
              props.setOpenWindow(false);
              props.setWindowDay(DateToKey(new Date()));
            }}
          >
            X
          </button>
          <div className="task-attributes">
            <h2>Completion Day</h2>
            <input
              type="date"
              name="date"
              value={props.windowDay}
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
  windowDay: PropTypes.string,
  setWindowDay: PropTypes.func,
  isHabit: PropTypes.bool,
  habitList: PropTypes.object,
  setHabitList: PropTypes.func,
};

export default NewTaskWindow;
