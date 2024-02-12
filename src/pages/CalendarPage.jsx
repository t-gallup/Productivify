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
} from "../functions/DateChanges";
import EditWindow from "../components/EditWindow";
import { auth } from "../firebase.js";
import Navbar from "../components/Navbar.jsx";
import {
  createNumDaysPerMonth,
  createNewTaskLists,
} from "../functions/InitializationFunctions.jsx";

function CalendarPage(props) {
  const [emptyList] = useState({});
  const [openWindow, setOpenWindow] = useState(false);
  const [openEditWindow, setOpenEditWindow] = useState(false);
  const [currentDay] = useState(new Date(Date.now()));
  const [displayDay, setDisplayDay] = useState(currentDay);
  const [editDescription, setEditDescription] = useState("");
  const [editDay, setEditDay] = useState("");
  const [editTime, setEditTime] = useState(0);

  useEffect(() => {
    auth.onAuthStateChanged((newUser) => {
      props.setUser(newUser);
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
        taskLists={props.taskLists}
        setTaskLists={props.setTaskLists}
        toDoList={props.toDoList}
        setToDoList={props.setToDoList}
        isToDo={false}
      ></NewTaskWindow>
      <EditWindow
        openEditWindow={openEditWindow}
        setOpenEditWindow={setOpenEditWindow}
        taskLists={props.taskLists}
        setTaskLists={props.setTaskLists}
        editDescription={editDescription}
        setEditDescription={setEditDescription}
        editDay={editDay}
        setEditDay={setEditDay}
        toDoList={props.toDoList}
        setToDoList={props.setToDoList}
        isToDo={false}
      ></EditWindow>
      <Navbar
        user={props.user}
        setTaskLists={props.setTaskLists}
        emptyTaskLists={props.emptyTaskLists}
        setToDoList={props.setToDoList}
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
          {weekdays.map((day) => (
            <>
              <p className="weekday">{day}</p>
            </>
          ))}
        </div>

        <div className="boxes">
          {[...Array(firstDayOfMonth)].map((x) => {
            return (
              <Box
                key={x}
                className="box-child"
                day=""
                month=""
                year=""
                taskList={emptyList}
                setEditDay={setEditDay}
                setEditDescription={setEditDescription}
                setOpenEditWindow={setOpenEditWindow}
                setEditTime={setEditTime}
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
                key={x}
                className="box-child"
                day={x}
                month={displayDay.getMonth() + 1}
                year={displayDay.getFullYear()}
                taskList={props.taskLists}
                setEditDay={setEditDay}
                setEditDescription={setEditDescription}
                setOpenEditWindow={setOpenEditWindow}
                setEditTime={setEditTime}
              />
            );
          })}
          {[
            ...Array(
              7 -
                ((firstDayOfMonth + numDaysPerMonth[displayDay.getMonth()]) % 7)
            ),
          ].map((x) => {
            return (
              <Box
                key={x}
                className="box-child"
                day=""
                month=""
                year=""
                taskList={emptyList}
                setEditDay={setEditDay}
                setEditDescription={setEditDescription}
                setOpenEditWindow={setOpenEditWindow}
                setEditTime={setEditTime}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}

CalendarPage.propTypes = {
  taskLists: PropTypes.object,
  setTaskLists: PropTypes.func,
  emptyTaskLists: PropTypes.object,
  user: PropTypes.object,
  setUser: PropTypes.func,
  handleSignOut: PropTypes.func,
  toDoList: PropTypes.object,
  setToDoList: PropTypes.func,
};

export default CalendarPage;
