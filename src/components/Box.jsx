import "./Box.css";
import PropTypes from "prop-types";
import Task from "./Task.jsx";
import ToDoTask from "./ToDoTask.jsx";
import { auth } from "../firebase.js";
import { writeUserHabit } from "../functions/DatabaseFunctions.jsx";
import { DateToKey } from "../functions/DateChanges.jsx";
import { useEffect, useRef } from "react";

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
  setIsToDo
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

function updateHabit(setHabitList, habitList, habitName, date, isCheck) {
  const newHabitList = structuredClone(habitList);
  if (isCheck) {
    newHabitList[habitName]["Dates"][date] = 1;
  } else {
    newHabitList[habitName]["Dates"][date] = 0;
  }
  writeUserHabit(auth.currentUser.uid, newHabitList);
  setHabitList(newHabitList);
  localStorage.setItem("userHabit", JSON.stringify(newHabitList));
}

function habitsCompleted(habitList, key, setHabitList) {
  if (habitList == undefined) {
    return;
  }

  return (
    <>
      {Object.entries(habitList)
        .filter(
          ([_, subDict]) =>
            subDict["Dates"] &&
            key in subDict["Dates"] &&
            subDict["Dates"][key] === 1
        )
        .map(([habitName, subDict]) => (
          <div key={habitName + "-" + key} className="habit-div">
            <button
              className="box-x"
              onClick={() =>
                updateHabit(setHabitList, habitList, habitName, key, false)
              }
            >
              X
            </button>
            <p className="habit-name">{habitName + " "}</p>
            {/* <p className="habit-time">
              {subDict["Time"]} {subDict["Time"] == 1 ? "hour" : "hours"}
            </p> */}
          </div>
        ))}
    </>
  );
}

function habitsMissed(habitList, key, setHabitList) {
  const weekday = new Date(key + "T00:00:00").getDay();
  if (habitList == undefined) {
    return;
  }
  return (
    <>
      {Object.entries(habitList)
        .filter(
          ([_, subDict]) =>
            subDict["Weekdays"] && subDict["Weekdays"][weekday] &&
            ((subDict["Dates"] && key in subDict["Dates"] && subDict["Dates"][key] !== 1) ||
              !(subDict["Dates"] && key in subDict["Dates"]))
        )
        .map(([habitName, subDict]) => (
          <div key={habitName + "-" + key} className="habit-div">
            <input
              type="checkbox"
              className="check-miss"
              onClick={() =>
                updateHabit(setHabitList, habitList, habitName, key, true)
              }
            ></input>
            <p className="habit-name">{habitName + " "}</p>
            {/* <p className="habit-time">
              {subDict["Time"]} {subDict["Time"] == 1 ? "hour" : "hours"}
            </p> */}
          </div>
        ))}
    </>
  );
}

function Box({
  date,
  taskList,
  toDoList,
  habitList,
  setEditDay,
  setEditDescription,
  setOpenWindow,
  setOpenEditWindow,
  setWindowDay,
  setEditTime,
  setIsToDo,
  setTaskList,
  setToDoList,
  setHabitList,
  user,
}) {
  const key = (date) ? DateToKey(date) : "";
  const currDay = new Date();
  const dayBoxRef = useRef(null);
  const dayNumRef = useRef(null);
  
  return (
    <>
      <div ref={dayBoxRef} className="day-box">
        {date && (
          <button
            className="day-button"
            onClick={() => {
              user?.email
                ? setDayOpenWindow(key, setOpenWindow, setWindowDay)
                : alert("Sign in to start adding tasks!");
            }}
          >
            <p ref={dayNumRef} className="day-num"> {date.getDate()}</p>
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

        <div className="habit-container" style={{ display: (habitsMissed(habitList, key, setHabitList).props.children.length === 0 && habitsCompleted(habitList, key, setHabitList).props.children.length === 0) ? 'none' : 'block' }}>
          {(key === "-00-00") || (key === "") ? (
            ""
          ) : (
            <div className="habit-list">
              <p className="habit-title">{date < currDay ? "Habits Missed" : "Upcoming Habits"}</p>
              {habitsMissed(habitList, key, setHabitList)}
              <hr className="complete" />
              <p className="habit-title">Habits Completed</p>
              {habitsCompleted(habitList, key, setHabitList)}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

Box.propTypes = {
  date: PropTypes.any,
  taskList: PropTypes.object,
  toDoList: PropTypes.object,
  habitList: PropTypes.object,
  setOpenWindow: PropTypes.func,
  setOpenEditWindow: PropTypes.func,
  setEditDay: PropTypes.func,
  setEditDescription: PropTypes.func,
  setEditTime: PropTypes.func,
  setWindowDay: PropTypes.func,
  setIsToDo: PropTypes.func,
  setTaskList: PropTypes.func,
  setToDoList: PropTypes.func,
  setHabitList: PropTypes.func,
  user: PropTypes.object,
};

export default Box;
