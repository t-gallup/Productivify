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
            name="newDay"
            value={newDay}
            onChange={handleEditDayChange}
          />
          <h2>Task Description</h2>
          <input
            type="text"
            name="newDescription"
            value={newDescription}
            onChange={handleEditDescriptionChange}
          />
          <h2>Estimated Completion Time</h2>
          <input
            type="number"
            name="newTime"
            value={newTime}
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
            onChange={handleEditDescriptionChange}
          />
          <h2>Habit Time per Day</h2>
          <input
            type="number"
            name="newTime"
            value={newTime}
            onChange={handleEditTimeChange}
          />
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
              props.setHabitList
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
              props.setOpenEditWindow,
            )
          }
        >
          Delete Task
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
            onChange={handleEditDayChange}
          />
          <h2>Task Description</h2>
          <input
            type="text"
            name="newDescription"
            value={newDescription}
            onChange={handleEditDescriptionChange}
          />
          <h2>Completion Time</h2>
          <input
            type="number"
            name="newTime"
            value={newTime}
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
  ); //   <div className="window-wrapper">
  //     <h1>Edit This Task</h1>
  //     <button
  //       className="close-button"
  //       onClick={() => props.setOpenEditWindow(false)}
  //     >
  //       X
  //     </button>
  //     <div className="task-attributes">
  //       <h2>Completion Day</h2>
  //       <input type="date" value={newDay} onChange={handleEditDayChange} />
  //       <h2>Task Description</h2>
  //       <input
  //         type="text"
  //         value={newDescription}
  //         onChange={handleEditDescriptionChange}
  //       />
  //       <h2>Completion Time</h2>
  //       <input type="number" value={newTime} onChange={handleEditTimeChange} />
  //     </div>
  //     <button
  //       className="edit-button"
  //       onClick={() =>
  //         handleEditTask(
  //           oldDay,
  //           newDay,
  //           oldDescription,
  //           newDescription,
  //           oldTime,
  //           newTime,
  //           props.taskList,
  //           props.setTaskList,
  //           props.setOpenEditWindow,
  //           props.toDoList,
  //           props.setToDoList,
  //           props.isToDo,
  //           props.habitList
  //         )
  //       }
  //     >
  //       Submit Edits
  //     </button>
  //     <button
  //       className="delete-button"
  //       onClick={() =>
  //         handleDeleteTask(
  //           props.editDay,
  //           props.editDescription,
  //           props.taskList,
  //           props.setTaskList,
  //           props.setOpenEditWindow,
  //           props.toDoList,
  //           props.setToDoList,
  //           props.isToDo,
  //           props.habitList
  //         )
  //       }
  //     >
  //       Delete Task
  //     </button>
  //   </div>
  // ) : (
  //   ""
  // );
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
