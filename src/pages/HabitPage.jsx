import "./HabitPage.css";
import PropTypes from "prop-types";
import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import NewTaskWindow from "../components/NewTaskWindow";
import { DateToKey } from "../functions/DateChanges";
import HabitItem from "../components/HabitItem";
import {
  SubtractMonth,
  AddMonth,
  SubtractWeek,
  AddWeek,
  FindMonday,
  SetSunday,
} from "../functions/DateChanges";

import EditWindow from "../components/EditWindow";

function HabitPage(props) {
  const [openWindow, setOpenWindow] = useState(false);
  const [editDescription, setEditDescription] = useState([]);
  const [editDay, setEditDay] = useState("");
  const [openEditWindow, setOpenEditWindow] = useState(false);
  const [displayDay, setDisplayDay] = useState(FindMonday(new Date()));
  const [displaySunday, setDisplaySunday] = useState(new Date(displayDay));
  useEffect(() => {
    SetSunday(displayDay, setDisplaySunday);
  }, []);

  const [windowDay, setWindowDay] = useState(DateToKey(new Date()));
  const [febDays, setFebDays] = useState(
    displayDay.getFullYear() % 4 == 0 ? 29 : 28
  );
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
  console.log(displayDay);
  console.log(displaySunday);
  console.log(displaySunday.getFullYear())
  // const [monday, setMonday] = useState(null);

  // useEffect(() => {
  //   const getMondayOfCurrentWeek = () => {
  //     const currentDay = new Date();
  //     const dayOfWeek = currentDay.getDay();
  //     const diffToMonday = (dayOfWeek + 6) % 7;
  //     const newMonday = new Date(currentDay);
  //     newMonday.setDate(currentDay.getDate() - diffToMonday);
  //     return newMonday;
  //   };

  //   setMonday(getMondayOfCurrentWeek());
  // }, []);

  return (
    <>
      <Navbar
        user={props.user}
        setUser={props.setUser}
        setTaskList={props.setTaskList}
        emptyTaskList={props.emptyTaskList}
        setToDoList={props.setToDoList}
      ></Navbar>
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
        isHabit={true}
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
        isToDo={false}
        isHabit={true}
        habitList={props.habitList}
        setHabitList={props.setHabitList}
      ></EditWindow>
      <div className="habit-header-wrap">
        <h1>Habit Tracker</h1>
        <button
          className="task-button"
          onClick={() => {
            props.user?.email
              ? setOpenWindow(true)
              : alert("Sign in to start adding habits!");
          }}
        >
          Add New Habit
        </button>
      </div>
      <div className="month">
        <button
          className="month-item"
          onClick={async () => {
            var newDate = await SubtractMonth({
              displayDay,
              setDisplayDay,
              setFebDays,
            });
            newDate = FindMonday(newDate);
            setDisplayDay(newDate);
            SetSunday(newDate, setDisplaySunday);
          }}
        >
          &#10094;&#10094;
        </button>
        <button
          className="month-item"
          onClick={async () => {
            var newDate = await SubtractWeek({ displayDay, setDisplayDay, setFebDays });
            // newDate = FindMonday(newDate);
            SetSunday(newDate, setDisplaySunday);
          }}
        >
          &#10094;
        </button>
        <p className="month-item month-text">
          {displayDay.getMonth() + 1}/{displayDay.getDate()}/
          {displayDay.getFullYear()%100}-{displaySunday.getMonth() + 1}/
          {displaySunday.getDate()}/{displaySunday.getFullYear()%100}
        </p>
        <button
          className="month-item"
          onClick={async () => {
            var newDate = await AddWeek({ displayDay, setDisplayDay, setFebDays });
            // newDate = FindMonday(newDate);
            SetSunday(newDate, setDisplaySunday);
          }}
        >
          &#10095;
        </button>
        <button
          className="month-item"
          onClick={async () => {
            var newDate = await AddMonth({
              displayDay,
              setDisplayDay,
              setFebDays,
            });
            newDate = FindMonday(newDate);
            setDisplayDay(newDate);
            SetSunday(newDate, setDisplaySunday);
          }}
        >
          &#10095;&#10095;
        </button>
      </div>
      <div className="habit-items">
        <div className="habit-column-names">
          <p className="bold-text habit-grid-item">Habit</p>
          <p className="habit-grid-item">Mon</p>
          <p className="habit-grid-item">Tues</p>
          <p className="habit-grid-item">Weds</p>
          <p className="habit-grid-item">Thur</p>
          <p className="habit-grid-item">Fri</p>
          <p className="habit-grid-item">Sat</p>
          <p className="habit-grid-item">Sun</p>
        </div>
        <div className="habit-grid">
          {Object.entries(props.habitList).map(([name, details], index) => (
            <HabitItem
              key={index}
              habitName={name}
              setEditDescription={setEditDescription}
              setOpenEditWindow={setOpenEditWindow}
              displayDay={displayDay}
              habitList={props.habitList}
              setHabitList={props.setHabitList}
            />
          ))}
        </div>
      </div>
    </>
  );
}

HabitPage.propTypes = {
  user: PropTypes.object,
  setUser: PropTypes.func,
  setTaskList: PropTypes.func,
  emptyTaskList: PropTypes.object,
  taskList: PropTypes.object,
  toDoList: PropTypes.object,
  setToDoList: PropTypes.func,
  habitList: PropTypes.object,
  setHabitList: PropTypes.func,
};

export default HabitPage;
