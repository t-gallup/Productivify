import "./CalendarPage.css";
import Box from "../components/Box";
import PropTypes from "prop-types";
import NewTaskWindow from "../components/NewTaskWindow";
import { useState, useMemo, useEffect } from "react";
import {
  SubtractMonth,
  AddMonth,
  SubtractYear,
  AddYear,
  DateToKey,
} from "../functions/DateChanges";
import EditWindow from "../components/EditWindow";
import { auth } from "../firebase.js";
import Navbar from "../components/Navbar.jsx";
import { createNumDaysPerMonth } from "../functions/InitializationFunctions.jsx";

function CalendarPage(props) {
  const [emptyList] = useState({});
  const [openWindow, setOpenWindow] = useState(false);
  const [openEditWindow, setOpenEditWindow] = useState(false);
  const [currentDay] = useState(new Date(Date.now()));
  const [displayDay, setDisplayDay] = useState(currentDay);
  const [editDescription, setEditDescription] = useState("");
  const [editDay, setEditDay] = useState("");
  const [editTime, setEditTime] = useState(0);
  const [windowDay, setWindowDay] = useState(DateToKey(currentDay));
  const [isToDo, setIsToDo] = useState(false);

  useEffect(() => {
    auth.onAuthStateChanged((newUser) => {
      props.setUser(newUser);
      localStorage.setItem("user", JSON.stringify(newUser));
    });
  });
  const firstDayOfMonth = new Date(
    displayDay.getFullYear(),
    displayDay.getMonth(),
    1
  ).getDay();

  const [monthMappings] = useState({
    0: "January",
    1: "Feburary",
    2: "March",
    3: "April",
    4: "May",
    5: "June",
    6: "July",
    7: "August",
    8: "September",
    9: "October",
    10: "November",
    11: "December",
  });

  const [febDays, setFebDays] = useState(
    displayDay.getFullYear() % 4 == 0 ? 29 : 28
  );
  const numDaysPerMonth = createNumDaysPerMonth(febDays);

  const weekdays = useMemo(
    () => ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    []
  );

  return (
    <>
      <NewTaskWindow
        openWindow={openWindow}
        setOpenWindow={setOpenWindow}
        taskList={props.taskList}
        setTaskList={props.setTaskList}
        toDoList={props.toDoList}
        setToDoList={props.setToDoList}
        isToDo={false}
        windowDay={windowDay}
        setWindowDay={setWindowDay}
        isHabit={false}
        habitList={props.habitList}
        setHabitList={props.setHabitList}
      ></NewTaskWindow>
      <EditWindow
        openEditWindow={openEditWindow}
        setOpenEditWindow={setOpenEditWindow}
        taskList={props.taskList}
        setTaskList={props.setTaskList}
        editDescription={editDescription}
        setEditDescription={setEditDescription}
        editDay={editDay}
        setEditDay={setEditDay}
        toDoList={props.toDoList}
        setToDoList={props.setToDoList}
        isToDo={isToDo}
        isHabit={false}
        habitList={props.habitList}
        setHabitList={props.setHabitList}
        windowDay={windowDay}
        setWindowDay={setWindowDay}
      ></EditWindow>
      <Navbar
        user={props.user}
        setUser={props.setUser}
        setTaskList={props.setTaskList}
        setToDoList={props.setToDoList}
        setHabitList={props.setHabitList}
      ></Navbar>

      <div className="calendar">
        <div className="header-wrap">
          <h1>Calendar View</h1>
          <button
            className="task-button"
            onClick={() => {
              props.user?.email
                ? setOpenWindow(true)
                : alert("Sign in to start adding tasks!");
            }}
          >
            Add Task
          </button>
        </div>

        <div className="month">
          <button
            className="month-item"
            onClick={() =>
              SubtractYear({
                displayDay,
                setDisplayDay,
                setFebDays,
              })
            }
          >
            &#10094;&#10094;
          </button>
          <button
            className="month-item"
            onClick={() =>
              SubtractMonth({ displayDay, setDisplayDay, setFebDays })
            }
          >
            &#10094;
          </button>
          <p className="month-item month-text">
            {monthMappings[displayDay.getMonth()]} {displayDay.getFullYear()}
          </p>
          <button
            className="month-item"
            onClick={() => AddMonth({ displayDay, setDisplayDay, setFebDays })}
          >
            &#10095;
          </button>
          <button
            className="month-item"
            onClick={() =>
              AddYear({
                displayDay,
                setDisplayDay,
                setFebDays,
              })
            }
          >
            &#10095;&#10095;
          </button>
        </div>

        <div className="weekdays">
          {weekdays.map((day, index) => (
              <p key={index} className="weekday">
                {day}
              </p>
          ))}
        </div>

        <div className="boxes">
          {[...Array(firstDayOfMonth)].map((x, index) => {
            return (
              <Box
                key={`empty-start-${index}`}
                className="box-child"
                date=""
                taskList={emptyList}
                toDoList={emptyList}
                habitList={emptyList}
                setEditDay={setEditDay}
                setEditDescription={setEditDescription}
                setOpenEditWindow={setOpenEditWindow}
                setOpenWindow={setOpenWindow}
                setWindowDay={setWindowDay}
                setEditTime={setEditTime}
                setIsToDo={setIsToDo}
                setTaskList={props.setTaskList}
                setToDoList={props.setToDoList}
                setHabitList={props.setHabitList}
                user={props.user}
              />
            );
          })}
          {[
            ...Array.from(
              { length: numDaysPerMonth[displayDay.getMonth()] },
              (_, index) => index + 1
            ),
          ].map((x) => {
            return (
              <Box
                key={`day-${x}`}
                className="box-child"
                date={new Date(displayDay.getFullYear(), displayDay.getMonth(), x)}
                taskList={props.taskList}
                toDoList={props.toDoList}
                habitList={props.habitList}
                setEditDay={setEditDay}
                setEditDescription={setEditDescription}
                setOpenEditWindow={setOpenEditWindow}
                setOpenWindow={setOpenWindow}
                setWindowDay={setWindowDay}
                setEditTime={setEditTime}
                setIsToDo={setIsToDo}
                setTaskList={props.setTaskList}
                setToDoList={props.setToDoList}
                setHabitList={props.setHabitList}
                user={props.user}
              />
            );
          })}
          {[
            ...Array(
              (7 -
                ((firstDayOfMonth + numDaysPerMonth[displayDay.getMonth()]) % 7)) % 7
            ),
          ].map((x, index) => {
            return (
              <Box
                key={`empty-end-${index}`}
                className="box-child"
                date=""
                taskList={emptyList}
                toDoList={emptyList}
                habitList={emptyList}
                setEditDay={setEditDay}
                setEditDescription={setEditDescription}
                setOpenEditWindow={setOpenEditWindow}
                setOpenWindow={setOpenWindow}
                setWindowDay={setWindowDay}
                setEditTime={setEditTime}
                setIsToDo={setIsToDo}
                setTaskList={props.setTaskList}
                setToDoList={props.setToDoList}
                setHabitList={props.setHabitList}
                user={props.user}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}

CalendarPage.propTypes = {
  taskList: PropTypes.object,
  setTaskList: PropTypes.func,
  user: PropTypes.object,
  setUser: PropTypes.func,
  handleSignOut: PropTypes.func,
  toDoList: PropTypes.object,
  setToDoList: PropTypes.func,
  habitList: PropTypes.object,
  setHabitList: PropTypes.func,
};

export default CalendarPage;
