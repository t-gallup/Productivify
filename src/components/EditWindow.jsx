import "./EditWindow.css";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import {
  handleEditTask,
  handleDeleteTask,
  handleEditHabit,
  handleDeleteHabit,
} from "../functions/TaskFunctions";
import { DateToKey } from "../functions/DateChanges";

function EditWindow(props) {
  const oldDay = props.editDay + "";
  const oldDescription = props.editDescription[0] + "";
  const oldTime = Number(props.editDescription[1]);
  const [newDay, setNewDay] = useState(oldDay);
  const [newDescription, setNewDescription] = useState(oldDescription);
  const [newTime, setNewTime] = useState(oldTime);
  const [selectMon, setSelectMon] = useState(true);
  const [selectTues, setSelectTues] = useState(true);
  const [selectWed, setSelectWed] = useState(true);
  const [selectThurs, setSelectThurs] = useState(true);
  const [selectFri, setSelectFri] = useState(true);
  const [selectSat, setSelectSat] = useState(true);
  const [selectSun, setSelectSun] = useState(true);
  useEffect(() => {
    if (props.isHabit) {
      if (props.habitList[props.editDescription[0]] !== undefined) {
        const weekdays = props.habitList[props.editDescription[0]]["Weekdays"]
        setSelectMon(weekdays[0])
        setSelectTues(weekdays[1])
        setSelectWed(weekdays[2])
        setSelectThurs(weekdays[3])
        setSelectFri(weekdays[4])
        setSelectSat(weekdays[5])
        setSelectSun(weekdays[6])
      }
    }
  }, [props.habitList[props.editDescription[0]]])
  
  const changeDayVal = (day, setDay) => {
    setDay(!day);
  };

  const handleEditDayChange = (event) => {
    setNewDay(event.target.value);
  };
  const handleEditDescriptionChange = (event) => {
    setNewDescription(event.target.value);
  };
  const handleEditTimeChange = (event) => {
    setNewTime(event.target.value);
  };
  const toggleDateInput = (event) => {
    const dateInput = document.getElementById("newDay");
    const noDateInput = document.getElementById("noDate");
    if (noDateInput.checked) {
      dateInput.value = "1111-11-11";
      dateInput.disabled = true;
      setNewDay(dateInput.value);
    } else {
      dateInput.disabled = false;
      dateInput.value = DateToKey(new Date());
      setNewDay(dateInput.value)
    }
  };
  useEffect(() => {
    setNewDay(props.editDay);
    setNewDescription(props.editDescription[0]);
    setNewTime(props.editDescription[1]);
  }, [props.editDay, props.editDescription]);
  return props.openEditWindow ? (
    props.isToDo ? (
      <div className="window-wrapper">
        <h1>Edit To Do Item</h1>
        <button
          className="close-button"
          onClick={() => {
            props.setOpenEditWindow(false);
            props.setWindowDay(DateToKey(new Date()));
          }}
        >
          X
        </button>
        <div className="task-attributes">
          <h2>Desired Completion Day</h2>
          <input
            type="date"
            id="newDay"
            name="newDay"
            value={newDay}
            className="window-input"
            onChange={handleEditDayChange}
            disabled={newDay === "on-00-00" || newDay === "1111-11-11"}
          />
          <div className="date-flex">
            <h3 className="date-title">No Due Date</h3>
            <input
              className="date-box"
              type="checkbox"
              id="noDate"
              name="noDate"
              onChange={toggleDateInput}
              checked={newDay === "on-00-00" || newDay === "1111-11-11"}
            ></input>
          </div>
          
          <h2>Task Description</h2>
          <input
            type="text"
            name="newDescription"
            value={newDescription}
            className="window-input"
            onChange={handleEditDescriptionChange}
          />
          <h2>Estimated Completion Time</h2>
          <input
            type="number"
            name="newTime"
            value={newTime}
            className="window-input"
            onChange={handleEditTimeChange}
          />
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
              props.taskList,
              props.setTaskList,
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
          onClick={() =>
            handleDeleteTask(
              props.editDay,
              props.editDescription,
              props.taskList,
              props.setTaskList,
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
    ) : props.isHabit ? (
      <div className="window-wrapper">
        <h1>Edit This Habit</h1>
        <button
          className="close-button"
          onClick={() => {
            props.setOpenEditWindow(false);
            props.setWindowDay(DateToKey(new Date()));
          }}
        >
          X
        </button>
        <div className="task-attributes">
          <h2>Habit Description</h2>
          <input
            type="text"
            name="newDescription"
            value={newDescription}
            className="window-input"
            onChange={handleEditDescriptionChange}
          />
          <h2>Habit Time per Day</h2>
          <input
            type="number"
            name="newTime"
            value={newTime}
            className="window-input"
            onChange={handleEditTimeChange}
          />
          <h2>Habit Days</h2>
            <button
              className={`${
                selectSun ? "button-selected" : "button-unselected"
              }`}
              onClick={() => changeDayVal(selectSun, setSelectSun)}
            >
              Sun
            </button>
            <button
              className={`${
                selectMon ? "button-selected" : "button-unselected"
              }`}
              onClick={() => changeDayVal(selectMon, setSelectMon)}
            >
              M
            </button>
            <button
              className={`${
                selectTues ? "button-selected" : "button-unselected"
              }`}
              onClick={() => changeDayVal(selectTues, setSelectTues)}
            >
              T
            </button>
            <button
              className={`${
                selectWed ? "button-selected" : "button-unselected"
              }`}
              onClick={() => changeDayVal(selectWed, setSelectWed)}
            >
              W
            </button>
            <button
              className={`${
                selectThurs ? "button-selected" : "button-unselected"
              }`}
              onClick={() => changeDayVal(selectThurs, setSelectThurs)}
            >
              Th
            </button>
            <button
              className={`${
                selectFri ? "button-selected" : "button-unselected"
              }`}
              onClick={() => changeDayVal(selectFri, setSelectFri)}
            >
              F
            </button>
            <button
              className={`${
                selectSat ? "button-selected" : "button-unselected"
              }`}
              onClick={() => changeDayVal(selectSat, setSelectSat)}
            >
              Sat
            </button>
            
        </div>

        <button
          className="edit-button"
          onClick={() =>
            handleEditHabit(
              oldDescription,
              newDescription,
              oldTime,
              newTime,
              props.setOpenEditWindow,
              props.habitList,
              props.setHabitList,
              [ selectSun,
                selectMon,
                selectTues,
                selectWed,
                selectThurs,
                selectFri,
                selectSat,
              ]
            )
          }
        >
          Submit Edits
        </button>
        <button
          className="delete-button"
          onClick={() =>
            handleDeleteHabit(
              oldDescription,
              props.habitList,
              props.setHabitList,
              props.setOpenEditWindow
            )
          }
        >
          Delete Habit
        </button>
      </div>
    ) : (
      <div className="window-wrapper">
        <h1>Edit This Task</h1>
        <button
          className="close-button"
          onClick={() => {
            props.setOpenEditWindow(false);
            props.setWindowDay(DateToKey(new Date()));
          }}
        >
          X
        </button>
        <div className="task-attributes">
          <h2>Completion Day</h2>
          <input
            type="date"
            name="newDay"
            value={newDay}
            className="window-input"
            onChange={handleEditDayChange}
          />
          <h2>Task Description</h2>
          <input
            type="text"
            name="newDescription"
            value={newDescription}
            className="window-input"
            onChange={handleEditDescriptionChange}
          />
          <h2>Completion Time</h2>
          <input
            type="number"
            name="newTime"
            value={newTime}
            className="window-input"
            onChange={handleEditTimeChange}
          />
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
              props.taskList,
              props.setTaskList,
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
          onClick={() =>
            handleDeleteTask(
              props.editDay,
              props.editDescription,
              props.taskList,
              props.setTaskList,
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
    )
  ) : (
    ""
  );
}

EditWindow.propTypes = {
  openEditWindow: PropTypes.bool,
  setOpenEditWindow: PropTypes.func,
  taskList: PropTypes.object,
  setTaskList: PropTypes.func,
  editDay: PropTypes.string,
  editDescription: PropTypes.any,
  setEditDay: PropTypes.func,
  setEditDescription: PropTypes.func,
  toDoList: PropTypes.object,
  setToDoList: PropTypes.func,
  isToDo: PropTypes.bool,
  habitList: PropTypes.object,
  setHabitList: PropTypes.func,
  isHabit: PropTypes.bool,
  windowDay: PropTypes.string,
  setWindowDay: PropTypes.func,
};

export default EditWindow;
