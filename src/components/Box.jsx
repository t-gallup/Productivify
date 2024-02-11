import "./Box.css";
import PropTypes from "prop-types";
import Task from "./Task.jsx";

function taskMapping(
  currList,
  key,
  setEditDay,
  setEditDescription,
  setOpenEditWindow,
  setEditTime
) {
  if (currList == undefined) {
    return;
  }
  return (
    <>
      {currList.map((task, time, index) => (
        <Task
          key={key + index}
          day={key}
          description={task}
          time={time}
          setEditDescription={setEditDescription}
          setEditDay={setEditDay}
          setOpenEditWindow={setOpenEditWindow}
          setEditTime={setEditTime}
        />
      ))}
    </>
  );
}
function Box({
  day,
  month,
  year,
  taskList,
  setEditDay,
  setEditDescription,
  setOpenEditWindow,
  setEditTime
}) {
  const key = `${year}-${month.toString().padStart(2, "0")}-${day
    .toString()
    .padStart(2, "0")}`;
  return (
    <>
      <div className="day-box">
        <p className="day-num"> {day}</p>
        <div className="box-tasks">
          {taskMapping(
            taskList[key],
            key,
            setEditDay,
            setEditDescription,
            setOpenEditWindow,
            setEditTime
          )}
        </div>
      </div>
    </>
  );
}

Box.propTypes = {
  day: PropTypes.any,
  month: PropTypes.any,
  year: PropTypes.any,
  taskList: PropTypes.object,
  setOpenEditWindow: PropTypes.func,
  setEditDay: PropTypes.func,
  setEditDescription: PropTypes.func,
  setEditTime: PropTypes.func
};

export default Box;
