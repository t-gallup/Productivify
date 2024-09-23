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
  FindSunday,
  SetSaturday,
} from "../functions/DateChanges";

import EditWindow from "../components/EditWindow";

function HabitPage(props) {
  const [openWindow, setOpenWindow] = useState(false);
  const [editDescription, setEditDescription] = useState([]);
  const [editDay, setEditDay] = useState("");
  const [openEditWindow, setOpenEditWindow] = useState(false);
  const [displayDay, setDisplayDay] = useState(FindSunday(new Date()));
  const [displaySaturday, setDisplaySaturday] = useState(new Date(displayDay));
  useEffect(() => {
    SetSaturday(displayDay, setDisplaySaturday);
  }, []);

  const [windowDay, setWindowDay] = useState(DateToKey(new Date()));
  const [febDays, setFebDays] = useState(
    displayDay.getFullYear() % 4 == 0 ? 29 : 28
  );
  const daysOfWeek = ["Sun","Mon", "Tues", "Weds", "Thur", "Fri", "Sat"];
  return (
    <>
      <Navbar
        user={props.user}
        setUser={props.setUser}
        setTaskList={props.setTaskList}
        setToDoList={props.setToDoList}
        setHabitList={props.setHabitList}
      ></Navbar>
      <NewTaskWindow
        openWindow={openWindow}
        setOpenWindow={setOpenWindow}
        taskList={props.taskList}
        setTaskList={props.setTaskList}
        toDoList={props.toDoList}
        setToDoList={props.setToDoList}
        isToDo={false}
        setIsToDo={props.setIsToDo}
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
        windowDay={windowDay}
        setWindowDay={setWindowDay}
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
            var newDate = SubtractMonth({
              displayDay,
              setDisplayDay,
              setFebDays,
            });
            newDate = FindSunday(newDate);
            setDisplayDay(newDate);
            SetSaturday(newDate, setDisplaySaturday);
          }}
        >
          &#10094;&#10094;
        </button>
        <button
          className="month-item"
          onClick={async () => {
            var newDate = SubtractWeek({ displayDay, setDisplayDay, setFebDays });
            SetSaturday(newDate, setDisplaySaturday);
          }}
        >
          &#10094;
        </button>
        <p className="month-item month-text">
          {displayDay.getMonth() + 1}/{displayDay.getDate()}/
          {displayDay.getFullYear()%100}-{displaySaturday.getMonth() + 1}/
          {displaySaturday.getDate()}/{displaySaturday.getFullYear()%100}
        </p>
        <button
          className="month-item"
          onClick={async () => {
            var newDate = AddWeek({ displayDay, setDisplayDay, setFebDays });
            SetSaturday(newDate, setDisplaySaturday);
          }}
        >
          &#10095;
        </button>
        <button
          className="month-item"
          onClick={async () => {
            var newDate = AddMonth({
              displayDay,
              setDisplayDay,
              setFebDays,
            });
            newDate = FindSunday(newDate);
            setDisplayDay(newDate);
            SetSaturday(newDate, setDisplaySaturday);
          }}
        >
          &#10095;&#10095;
        </button>
      </div>
      <div className="habit-items">
        <div className="habit-column-names">
          <p className="bold-text habit-grid-item">Habit</p>
          {daysOfWeek.map((day, index) => {
            const tempDate = new Date(displayDay);
            tempDate.setDate(displayDay.getDate() + index);
            return (
              <p key={index} className="habit-grid-item">
                {day} {tempDate.getMonth()+1 + "/" + tempDate.getDate()}
              </p>
            );
          })}
        </div>
        <div className="habit-grid">
          {Object.entries(props.habitList).map(([name, details], index) => (
            <HabitItem
              key={`${name}-${index}`}
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
  taskList: PropTypes.object,
  toDoList: PropTypes.object,
  setToDoList: PropTypes.func,
  habitList: PropTypes.object,
  setHabitList: PropTypes.func,
  setIsToDo: PropTypes.func,
};

export default HabitPage;
