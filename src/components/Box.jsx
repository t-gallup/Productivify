import "./Box.css";
import PropTypes from "prop-types";
import Task from "./Task.jsx";

function taskMapping(
  currList,
  key,
  setOpenEditWindow,
  setEditDay,
  setEditDescription
) {
  if (currList == undefined) {
    return;
  }
  return (
    <>
      {currList.map((task) => (
        <Task
          key={key}
          day={key}
          description={task}
          setEditDescription={setEditDescription}
          setEditDay={setEditDay}
          setOpenEditWindow={setOpenEditWindow}
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
            setOpenEditWindow,
            setEditDay,
            setEditDescription
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
  taskList: PropTypes.any,
  setOpenEditWindow: PropTypes.func,
  setEditDay: PropTypes.func,
  setEditDescription: PropTypes.func,
};

export default Box;
