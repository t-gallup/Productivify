import "./CalendarPage.css";
import Box from "../components/Box";
import PropTypes from "prop-types";
import NewTaskWindow from "../components/NewTaskWindow";
import { useCallback, useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  SubtractMonth,
  AddMonth,
  SubtractYear,
  AddYear,
} from "../functions/DateChanges";
import EditWindow from "../components/EditWindow";
import { auth } from "../firebase.js";
import { signOut } from "firebase/auth";
import { writeUserData } from "../functions/DataBaseFunctions";
import Navbar from "../components/Navbar.jsx";

function CalendarPage(props) {
  const [emptyList] = useState({});
  const [openWindow, setOpenWindow] = useState(false);
  const [openEditWindow, setOpenEditWindow] = useState(false);
  const [currentDay] = useState(new Date(Date.now()));
  const [displayDay, setDisplayDay] = useState(currentDay);
  const [editDescription, setEditDescription] = useState("");
  const [editDay, setEditDay] = useState("");
  const navigate = useNavigate();
  const handleSignOut = async () => {
    await signOut(auth);
    console.log(props.emptyTaskLists);
    props.setTaskLists({ ...props.emptyTaskLists });
    console.log(props.taskLists);
    navigate("/");
  };

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
  const numDaysPerMonth = useMemo(
    () => ({
      0: 31,
      1: febDays,
      2: 31,
      3: 30,
      4: 31,
      5: 30,
      6: 31,
      7: 31,
      8: 30,
      9: 31,
      10: 30,
      11: 31,
    }),
    [febDays]
  );

  useEffect(() => {
    const newTaskLists = { ...props.taskLists };
    const years = Array.from({ length: 500 }, (_, index) => index + 1900);
    years.forEach((year) => {
      for (let month = 1; month <= 12; month++) {
        var currNumDays = numDaysPerMonth[month - 1];
        if (year % 4 == 0 && month == 2) {
          currNumDays = 29;
        }
        for (let day = 1; day <= currNumDays; day++) {
          const key = `${year}-${month.toString().padStart(2, "0")}-${day
            .toString()
            .padStart(2, "0")}`;
          newTaskLists[key] = [];
        }
      }
    });
    props.setEmptyTaskLists({ ...newTaskLists });
    props.setTaskLists({ ...newTaskLists });
  }, []);

  const handleAddTask = useCallback(
    (completionDay, taskDescription) => {
      const newTaskLists = { ...props.taskLists };
      const key = `${completionDay.substring(0, 4)}-${completionDay
        .substring(5, 7)
        .padStart(2, "0")}-${completionDay.substring(8, 10).padStart(2, "0")}`;
      if (newTaskLists[key] !== undefined) {
        newTaskLists[key].push(taskDescription);
      }

      props.setTaskLists({ ...newTaskLists });
      writeUserData(auth.currentUser.uid, props.taskLists);
      setOpenWindow(false);
    },
    [setOpenWindow, props]
  );

  const handleDeleteTask = useCallback(
    (completionDay, taskDescription) => {
      const newTaskLists = { ...props.taskLists };
      const key = `${completionDay.substring(0, 4)}-${completionDay
        .substring(5, 7)
        .padStart(2, "0")}-${completionDay.substring(8, 10).padStart(2, "0")}`;

      if (newTaskLists[key] !== undefined) {
        const delIndex = newTaskLists[key].indexOf(taskDescription);
        newTaskLists[key].splice(delIndex, 1);
      }
      props.setTaskLists({ ...newTaskLists });
      writeUserData(auth.currentUser.uid, props.taskLists);
      setOpenEditWindow(false);
    },
    [setOpenEditWindow, props]
  );

  const handleEditTask = useCallback(
    (oldDay, newDay, oldDescription, newDescription) => {
      const oldKey = `${oldDay.substring(0, 4)}-${oldDay
        .substring(5, 7)
        .padStart(2, "0")}-${oldDay.substring(8, 10).padStart(2, "0")}`;
      const newKey = `${newDay.substring(0, 4)}-${newDay
        .substring(5, 7)
        .padStart(2, "0")}-${newDay.substring(8, 10).padStart(2, "0")}`;
      const newTaskLists = { ...props.taskLists };
      if (
        newTaskLists[oldKey] !== undefined &&
        oldDescription !== newDescription
      ) {
        const editIndex = newTaskLists[oldKey].indexOf(oldDescription);
        newTaskLists[oldKey][editIndex] = newDescription;
      }
      if (oldKey !== newKey) {
        const delIndex = newTaskLists[oldKey].indexOf(newDescription);
        newTaskLists[oldKey].splice(delIndex, 1);
        newTaskLists[newKey].push(newDescription);
      }
      props.setTaskLists({ ...newTaskLists });
      writeUserData(auth.currentUser.uid, props.taskLists);
      setOpenEditWindow(false);
    },
    [setOpenEditWindow, props]
  );

  const weekdays = useMemo(
    () => ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    []
  );

  return (
    <>
      <NewTaskWindow
        openWindow={openWindow}
        setOpenWindow={setOpenWindow}
        taskList={props.taskLists}
        handleAddTask={handleAddTask}
      ></NewTaskWindow>
      <EditWindow
        openEditWindow={openEditWindow}
        setOpenEditWindow={setOpenEditWindow}
        taskList={props.taskLists}
        handleDeleteTask={handleDeleteTask}
        handleEditTask={handleEditTask}
        editDescription={editDescription}
        setEditDescription={setEditDescription}
        editDay={editDay}
        setEditDay={setEditDay}
      ></EditWindow>
      <Navbar user={props.user} handleSignOut={handleSignOut}></Navbar>

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
  setEmptyTaskLists: PropTypes.func,
  user: PropTypes.object,
  setUser: PropTypes.func,
};

export default CalendarPage;
