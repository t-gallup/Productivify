import "./App.css";
import Box from "./components/Box";
import NewTaskWindow from "./components/NewTaskWindow";
import { useCallback, useState, useMemo, useEffect } from "react";
import {
  SubtractMonth,
  AddMonth,
  SubtractYear,
  AddYear,
} from "./functions/DateChanges";
import EditWindow from "./components/EditWindow";
import SignIn from "./components/SignIn";

function App() {
  const [emptyList] = useState({});
  // const [years] = useState(
  //   Array.from({ length: 30 }, (_, index) => index + 2011)
  // );
  const [openWindow, setOpenWindow] = useState(false);
  const [openEditWindow, setOpenEditWindow] = useState(false);
  const [currentDay] = useState(new Date(Date.now()));
  const [displayDay, setDisplayDay] = useState(currentDay);
  const [editDescription, setEditDescription] = useState("");
  const [editDay, setEditDay] = useState("");
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

  const [taskLists, setTaskLists] = useState({});
  // const newTaskLists = { ...taskLists };
  // years.forEach((year) => {
  //   for (let month = 1; month <= 12; month++) {
  //     var currNumDays = numDaysPerMonth[month - 1];
  //     if (year % 4 == 0 && month == 2) {
  //       currNumDays = 29;
  //     }
  //     for (let day = 1; day <= currNumDays; day++) {
  //       const key = `${year}-${month.toString().padStart(2, "0")}-${day
  //         .toString()
  //         .padStart(2, "0")}`;
  //       newTaskLists[key] = [];
  //     }
  //   }
  // });
  // if (taskLists["2021-01-01"] == undefined) {
  //   setTaskLists(newTaskLists);
  // }
  useEffect(() => {
    const savedTaskLists = localStorage.getItem("myTaskLists");
    // console.log(savedTaskLists);
    if (savedTaskLists) {
      setTaskLists(JSON.parse(savedTaskLists));
    } else {
      const newTaskLists = { ...taskLists };
      const years = Array.from({ length: 2500 }, (_, index) => index);
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
      if (taskLists["2021-01-01"] == undefined) {
        setTaskLists(newTaskLists);
      }
    }
  }, []);

  const handleAddTask = useCallback(
    (completionDay, taskDescription) => {
      console.log(completionDay);
      const newTaskLists = { ...taskLists };
      const key = `${completionDay.substring(0, 4)}-${completionDay
        .substring(5, 7)
        .padStart(2, "0")}-${completionDay.substring(8, 10).padStart(2, "0")}`;
      console.log(key);
      if (newTaskLists[key] !== undefined) {
        newTaskLists[key].push(taskDescription);
      }

      setTaskLists(newTaskLists);
      setOpenWindow(false);
    },
    [taskLists, setOpenWindow]
  );

  const handleDeleteTask = useCallback(
    (completionDay, taskDescription) => {
      const newTaskLists = { ...taskLists };
      const key = `${completionDay.substring(0, 4)}-${completionDay
        .substring(5, 7)
        .padStart(2, "0")}-${completionDay.substring(8, 10).padStart(2, "0")}`;

      if (newTaskLists[key] !== undefined) {
        const delIndex = newTaskLists[key].indexOf(taskDescription);
        newTaskLists[key].splice(delIndex, 1);
      }
      setTaskLists(newTaskLists);
      setOpenEditWindow(false);
    },
    [taskLists, setOpenEditWindow]
  );

  const handleEditTask = useCallback(
    (oldDay, newDay, oldDescription, newDescription) => {
      console.log("Test: ", oldDay, newDay, oldDescription, newDescription);
      const oldKey = `${oldDay.substring(0, 4)}-${oldDay
        .substring(5, 7)
        .padStart(2, "0")}-${oldDay.substring(8, 10).padStart(2, "0")}`;
      const newKey = `${newDay.substring(0, 4)}-${newDay
        .substring(5, 7)
        .padStart(2, "0")}-${newDay.substring(8, 10).padStart(2, "0")}`;
      const newTaskLists = { ...taskLists };
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
      setTaskLists(newTaskLists);
      setOpenEditWindow(false);
    },
    [taskLists, setOpenEditWindow]
  );

  const weekdays = useMemo(
    () => ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    []
  );
  return (
    <>
      <SignIn></SignIn>
      <NewTaskWindow
        openWindow={openWindow}
        setOpenWindow={setOpenWindow}
        taskList={taskLists}
        handleAddTask={handleAddTask}
      ></NewTaskWindow>
      <EditWindow
        openEditWindow={openEditWindow}
        setOpenEditWindow={setOpenEditWindow}
        taskList={taskLists}
        handleDeleteTask={handleDeleteTask}
        handleEditTask={handleEditTask}
        editDescription={editDescription}
        setEditDescription={setEditDescription}
        editDay={editDay}
        setEditDay={setEditDay}
      ></EditWindow>
      <div className="calendar">
        <div className="header-wrap">
          <h1>Task Tracker</h1>
          <button
            className="save-button"
            onClick={() =>
              localStorage.setItem("myTaskLists", JSON.stringify(taskLists))
            }
          >
            Save Tasks
          </button>
          <button className="task-button" onClick={() => setOpenWindow(true)}>
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
                taskList={taskLists}
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

export default App;
