import "./ToDoTask.css";
import PropTypes from "prop-types";
import CheckBox from "@mui/joy/Checkbox";
import { handleAddTask, handleDeleteTask } from "../functions/TaskFunctions";
import { useState } from "react";

function handleEditButtonClick(
  description,
  day,
  setEditDay,
  setEditDescription,
  setOpenEditWindow,
  setIsToDo
) {
  setEditDay(day);
  setEditDescription(description);
  setOpenEditWindow(true);
  setIsToDo(true);
}

function ToDoTask(props) {
  const [checked, setChecked] = useState(false);
  const handleCheckBoxClick = (setChecked) => {
    handleAddTask(
      props.day,
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
  return (
    <>
      <div className="task-box">
        <button
          className="to-do-ind-task-button"
          onClick={() =>
            handleEditButtonClick(
              props.description,
              props.day,
              props.setEditDay,
              props.setEditDescription,
              props.setOpenEditWindow,
              props.setIsToDo
            )
          }
        >
          <div className="to-do-button-text">
            <div className="check-box-div">
              <CheckBox
                className="task-checkbox"
                checked={checked}
                onChange={() => handleCheckBoxClick(setChecked)}
              ></CheckBox>
            </div>
            <div className="button-inner-text">
              <p className="task-description"> {props.description[0]}</p>
              <p className="task-time">
                {props.description[1]}{" "}
                {props.description[1] === "1" ? "hour" : "hours"}
              </p>
            </div>
          </div>
          
          
        </button>
      </div>
    </>
  );
}

ToDoTask.propTypes = {
  description: PropTypes.array,
  day: PropTypes.string,
  setEditDescription: PropTypes.func,
  setEditDay: PropTypes.func,
  setEditTime: PropTypes.func,
  setOpenWindow: PropTypes.func,
  setOpenEditWindow: PropTypes.func,
  setIsToDo: PropTypes.func,
  toDoList: PropTypes.object,
  taskList: PropTypes.object,
  setTaskList: PropTypes.func,
  setToDoList: PropTypes.func,
};

export default ToDoTask;
