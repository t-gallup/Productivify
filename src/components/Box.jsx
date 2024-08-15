import "./Box.css";
import PropTypes from "prop-types";
import Task from "./Task.jsx";
import ToDoTask from "./ToDoTask.jsx"

function setDayOpenWindow(day, setOpenWindow, setWindowDay) {
  setOpenWindow(true);
  setWindowDay(day);
}

function taskMapping(
  currList,
  key,
  setEditDay,
  setEditDescription,
  setOpenEditWindow,
  setEditTime,
  setIsToDo,
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
          setIsToDo={setIsToDo}
        />
      ))}
    </>
  );
}

function toDoMapping(
  currList,
  key,
  setEditDay,
  setEditDescription,
  setOpenWindow,
  setOpenEditWindow,
  setEditTime,
  setIsToDo,
  taskList,
  toDoList,
  setTaskList,
  setToDoList
) {
  if (currList == undefined) {
    return;
  }
  return (
    <>
      {currList.map((task, index) => (
        <ToDoTask
          key={index}
          day={key}
          description={task}
          setEditDescription={setEditDescription}
          setEditDay={setEditDay}
          setOpenWindow={setOpenWindow}
          setOpenEditWindow={setOpenEditWindow}
          setEditTime={setEditTime}
          setIsToDo={setIsToDo}
          taskList={taskList}
          toDoList={toDoList}
          setTaskList={setTaskList}
          setToDoList={setToDoList}
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
  toDoList,
  setEditDay,
  setEditDescription,
  setOpenWindow,
  setOpenEditWindow,
  setWindowDay,
  setEditTime,
  setIsToDo,
  setTaskList,
  setToDoList,
  user,
}) {
  const key = `${year}-${month.toString().padStart(2, "0")}-${day
    .toString()
    .padStart(2, "0")}`;
  return (
    <>
      <div className="day-box">
        {day && (
          <button
            className="day-button"
            onClick={() => {
              user?.email
                ? setDayOpenWindow(key, setOpenWindow, setWindowDay)
                : alert("Sign in to start adding tasks!");
            }}
          >
            <p className="day-num"> {day}</p>
          </button>
        )}
        <div className="box-tasks">
          {toDoMapping(
            toDoList[key],
            key,
            setEditDay,
            setEditDescription,
            setOpenWindow,
            setOpenEditWindow,
            setEditTime,
            setIsToDo,
            taskList,
            toDoList,
            setTaskList,
            setToDoList
          )}
          {taskMapping(
            taskList[key],
            key,
            setEditDay,
            setEditDescription,
            setOpenEditWindow,
            setEditTime,
            setIsToDo
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
  toDoList: PropTypes.object,
  setOpenWindow: PropTypes.func,
  setOpenEditWindow: PropTypes.func,
  setEditDay: PropTypes.func,
  setEditDescription: PropTypes.func,
  setEditTime: PropTypes.func,
  setWindowDay: PropTypes.func,
  setIsToDo: PropTypes.func,
  setTaskList: PropTypes.func,
  setToDoList: PropTypes.func,
  user: PropTypes.object,
};

export default Box;
