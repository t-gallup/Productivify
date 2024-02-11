import "./ToDoItem.css";
import PropTypes from "prop-types";
import CheckBox from "@mui/joy/Checkbox";
import { handleAddTask, handleDeleteTask } from "../functions/TaskFunctions";

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
  const handleCheckBoxClick = () => {
    handleAddTask(
      props.day,
      props.description[0],
      props.description[1],
      props.taskLists,
      props.setTaskLists,
      props.setOpenWindow,
      props.toDoList,
      props.setToDoList,
      false
    );
    handleDeleteTask(
      props.day,
      props.description,
      props.taskLists,
      props.setTaskLists,
      props.setOpenEditWindow,
      props.toDoList,
      props.setToDoList,
      true
    );
  };
  const newDate = props.day.substring(5);
  console.log(newDate);
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
              onChange={handleCheckBoxClick}
            ></CheckBox>
            <p className="task-date"> {newDate} </p>
            <p className="task-description"> {props.description[0]}</p>
            <p className="task-time"> {props.description[1]} hours</p>
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
  taskLists: PropTypes.object,
  setTaskLists: PropTypes.func,
  setOpenWindow: PropTypes.func,
  toDoList: PropTypes.object,
  setToDoList: PropTypes.func,
};

export default ToDoItem;
