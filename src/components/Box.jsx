import "./Box.css";
import PropTypes from "prop-types";
import Task from "./Task.jsx";

function Box({ day, taskList }) {
  return (
    <>
      <div className="day-box">
        <p className="day-num"> {day}</p>
        <div className="box-tasks">
          {taskList?.map((task) => (
            <Task key={task.id} description={task} />
          ))}
        </div>
      </div>
    </>
  );
}

Box.propTypes = {
  day: PropTypes.string,
  taskList: PropTypes.array,
};

export default Box;
