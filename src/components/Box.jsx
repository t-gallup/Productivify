import "./Box.css";
import PropTypes from "prop-types";
import Task from "./Task.jsx";

function taskMapping(currList, key) {
  if (currList == undefined) {
    return;
  }
  return (
    
    <>
      {currList.map((task) =>
        <Task key={key} description={task} />
      )}
    </>
  );
}
function Box({day, month, year, taskList }) {
  const key = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
  return (
    <>
      <div className="day-box">
        <p className="day-num"> {day}</p>
        <div className="box-tasks">
          {taskMapping(taskList[key], key)}
        </div>
      </div>
    </>
  );
}

Box.propTypes = {
  day: PropTypes.any,
  month: PropTypes.any,
  year: PropTypes.any,
  taskList: PropTypes.any,
};

export default Box;
