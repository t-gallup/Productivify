import { useState, useRef } from "react";
import "./NewTaskWindow.css";
import PropTypes from "prop-types";
import { handleAddTask, handleAddHabit } from "../functions/TaskFunctions";
import { DateToKey } from "../functions/DateChanges";

function NewTaskWindow(props) {
  const [taskDescription, setTaskDescription] = useState("");
  const [completionTime, setCompletionTime] = useState(0);
  const [currDay, setCurrDay] = useState(props.windowDay);
  const [selectMon, setSelectMon] = useState(true);
  const [selectTues, setSelectTues] = useState(true);
  const [selectWed, setSelectWed] = useState(true);
  const [selectThurs, setSelectThurs] = useState(true);
  const [selectFri, setSelectFri] = useState(true);
  const [selectSat, setSelectSat] = useState(true);
  const [selectSun, setSelectSun] = useState(true);

  const changeDayVal = (day, setDay) => {
    setDay(!day);
  };

  const submitButtonRef = useRef(null);
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "date") {
      setCurrDay(value);
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

  const toggleDateInput = (event) => {
    const dateInput = document.getElementById("date");
    const noDateInput = document.getElementById("noDate");
    if (noDateInput.checked) {
      dateInput.value = "1111-11-11";
      dateInput.disabled = true;
      setCurrDay(dateInput.value);
    } else {
      dateInput.disabled = false;
      dateInput.value = DateToKey(new Date());
      setCurrDay(dateInput.value)
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
        props.setOpenWindow,
        [
          selectSun,
          selectMon,
          selectTues,
          selectWed,
          selectThurs,
          selectFri,
          selectSat
          
        ]
      );
      setSelectMon(true);
      setSelectTues(true);
      setSelectWed(true);
      setSelectThurs(true);
      setSelectFri(true);
      setSelectSat(true);
      setSelectSun(true);

    } else {
      // const dateValue = event.target.elements.date.value;
      // console.log("Final Date: ", dateValue);
      handleAddTask(
        currDay,
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
              id="date"
              value={currDay}
              onChange={handleInputChange}
              onKeyDown={handleEnterPress}
            />
            <div className="date-flex">
              <h3 className="date-title">No Due Date</h3>
              <input
                className="date-box"
                type="checkbox"
                id="noDate"
                name="noDate"
                onChange={toggleDateInput}
              ></input>
            </div>
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
            <h2>Habit Days</h2>
            <button
              type="button"
              className={`${
                selectSun ? "button-selected" : "button-unselected"
              }`}
              onClick={() => changeDayVal(selectSun, setSelectSun)}
            >
              Sun
            </button>
            <button
              type="button"
              className={`${
                selectMon ? "button-selected" : "button-unselected"
              }`}
              onClick={() => changeDayVal(selectMon, setSelectMon)}
            >
              M
            </button>
            <button
              type="button"
              className={`${
                selectTues ? "button-selected" : "button-unselected"
              }`}
              onClick={() => changeDayVal(selectTues, setSelectTues)}
            >
              T
            </button>
            <button
              type="button"
              className={`${
                selectWed ? "button-selected" : "button-unselected"
              }`}
              onClick={() => changeDayVal(selectWed, setSelectWed)}
            >
              W
            </button>
            <button
              type="button"
              className={`${
                selectThurs ? "button-selected" : "button-unselected"
              }`}
              onClick={() => changeDayVal(selectThurs, setSelectThurs)}
            >
              Th
            </button>
            <button
              type="button"
              className={`${
                selectFri ? "button-selected" : "button-unselected"
              }`}
              onClick={() => changeDayVal(selectFri, setSelectFri)}
            >
              F
            </button>
            <button
              type="button"
              className={`${
                selectSat ? "button-selected" : "button-unselected"
              }`}
              onClick={() => changeDayVal(selectSat, setSelectSat)}
            >
              Sat
            </button>
            
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
              value={currDay}
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
