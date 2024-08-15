import "./Task.css";
import PropTypes from "prop-types";

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
  setIsToDo(false);
}
function Task(props) {
  return (
    <>
      <div className="task-box">
        <button
          className="ind-task-button"
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
          <p className="task-description"> {props.description[0]}</p>
          <p className="task-time">
            {props.description[1]}{" "}
            {props.description[1] === "1" ? "hour" : "hours"}
          </p>
        </button>
      </div>
    </>
  );
}

Task.propTypes = {
  description: PropTypes.array,
  day: PropTypes.string,
  setEditDescription: PropTypes.func,
  setEditDay: PropTypes.func,
  setEditTime: PropTypes.func,
  setOpenEditWindow: PropTypes.func,
  setIsToDo: PropTypes.func,
};

export default Task;
