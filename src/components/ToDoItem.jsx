import "./ToDoItem.css";
import PropTypes from "prop-types";
import CheckBox from "@mui/joy/Checkbox";
import { handleAddTask, handleDeleteTask } from "../functions/TaskFunctions";
import { useState } from "react";
import { DateToKey } from "../functions/DateChanges";

function handleEditButtonClick(
  description,
  day,
  setEditDay,
  setEditDescription,
  setOpenEditWindow
) {
  setEditDay(day);
  setEditDescription(description);
  setOpenEditWindow(true);
}

function ToDoItem(props) {
  const handleCheckBoxClick = (setChecked) => {
    var assignmentDay = props.day
    if ((props.day === "on-00-00") || (props.day === "1111-11-11")) {
      assignmentDay = DateToKey(new Date());
    }
    handleAddTask(
      assignmentDay,
      props.description[0],
      props.description[1],
      props.taskList,
      props.setTaskList,
      props.setOpenWindow,
      props.toDoList,
      props.setToDoList,
      false
    );
    handleDeleteTask(
      props.day,
      props.description,
      props.taskList,
      props.setTaskList,
      props.setOpenEditWindow,
      props.toDoList,
      props.setToDoList,
      true
    );
    setChecked(false);
  };
  const newDate = props.day.substring(5);
  const [checked, setChecked] = useState(false);
  return (
    <>
      <div className="to-do-box">
        <button
          className="to-do-button"
          onClick={() =>
            handleEditButtonClick(
              props.description,
              props.day,
              props.setEditDay,
              props.setEditDescription,
              props.setOpenEditWindow
            )
          }
        >
          <div className="button-wrapper">
            <CheckBox
              className="task-checkbox"
              checked={checked}
              onChange={() => handleCheckBoxClick(setChecked)}
            ></CheckBox>
            <p className="task-date"> {(newDate === "-00") || (newDate === "11-11") ? "N/A" : newDate} </p>
            <p className="task-description"> {props.description[0]}</p>
            <p className="task-time">
              {" "}
              {props.description[1]}{" "}
              {props.description[1] === "1" ? "hour" : "hours"}
            </p>
          </div>
        </button>
      </div>
    </>
  );
}

ToDoItem.propTypes = {
  description: PropTypes.array,
  day: PropTypes.string,
  setEditDescription: PropTypes.func,
  setEditDay: PropTypes.func,
  setOpenEditWindow: PropTypes.func,
  taskList: PropTypes.object,
  setTaskList: PropTypes.func,
  setOpenWindow: PropTypes.func,
  toDoList: PropTypes.object,
  setToDoList: PropTypes.func,
  habitList: PropTypes.object,
};

export default ToDoItem;
