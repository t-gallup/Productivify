import "./Box.css";
import PropTypes from "prop-types";
import Task from "./Task.jsx";


function setDayOpenWindow(day, setOpenWindow, setWindowDay){
  setOpenWindow(true);
  setWindowDay(day);
}

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
      {currList.map((task, index) => (
        <Task
          key={index}
          day={key}
          description={task}
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
  setOpenWindow,
  setOpenEditWindow,
  setWindowDay,
  setEditTime,
  user
}) {
  const key = `${year}-${month.toString().padStart(2, "0")}-${day
    .toString()
    .padStart(2, "0")}`;
  return (
    <>
      <div className="day-box">
        {day && (<button
          className="day-button"
          onClick={() => {
            user?.email
              ? setDayOpenWindow(key, setOpenWindow, setWindowDay)
              : alert("Sign in to start adding tasks!");
          }}>
          <p className="day-num"> {day}</p>
        </button>)}
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
  setOpenWindow: PropTypes.func,
  setOpenEditWindow: PropTypes.func,
  setEditDay: PropTypes.func,
  setEditDescription: PropTypes.func,
  setEditTime: PropTypes.func,
  setWindowDay: PropTypes.func,
  user: PropTypes.object
};

export default Box;
