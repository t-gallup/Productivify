import "./App.css";
import Box from "./components/Box";
import NewTaskWindow from "./components/NewTaskWindow";
import { useCallback, useState, useMemo } from "react";
import { SubtractMonth, AddMonth } from "./functions/DateChanges";

function App() {
  const [emptyList, ] = useState({})
  const [years,] = useState(Array.from({ length: 4 }, (_, index) => index + 2021));
  const [openWindow, setOpenWindow] = useState(false);
  const [currentDay,] = useState(new Date(Date.now()));
  const [displayDay, setDisplayDay] = useState(currentDay);
  const firstDayOfMonth = new Date(
    displayDay.getFullYear(),
    displayDay.getMonth(),
    1
  ).getDay();

  const [monthMappings,] = useState({
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
  const numDaysPerMonth = useMemo(() => ({
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
  }), [febDays]);


    

  const [taskLists, setTaskLists] = useState({});
  const newTaskLists = {...taskLists}
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
  setTaskLists(newTaskLists);
  const handleAddTask = useCallback((completionDay, taskDescription) => {
    const newTaskLists = {...taskLists};
    const key = `${completionDay.substring(0, 4)}-${completionDay
      .substring(5, 7)
      .padStart(2, "0")}-${completionDay
      .substring(8, 10)
      .padStart(2, "0")}`;

    if (newTaskLists[key] !== undefined) {
      newTaskLists[key].push(taskDescription);
    }

    setTaskLists(newTaskLists);
    setOpenWindow(false);
  }, [taskLists, setOpenWindow]);

  const weekdays = useMemo(() => (
    ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  ), []);

  const boxes = useMemo(() => {
    const daysArray = Array.from({ length: numDaysPerMonth[displayDay.getMonth()] }, (_, index) => index + 1);

    return [
      ...Array(firstDayOfMonth).map((x) => {
          <Box
            key={x}
            className="box-child"
            day=""
            month=""
            year=""
            taskList={emptyList}
          />
      }),
      ...daysArray.map(x => (
        <Box key={x} className="box-child" day={x} month={displayDay.getMonth() + 1} year={displayDay.getFullYear()} taskList={taskLists} />
      )),
      ...Array(7 - ((firstDayOfMonth + daysArray.length) % 7)).map((x) => {
        <Box
          key={x}
          className="box-child"
          day=""
          month=""
          year=""
          taskList={emptyList}
        />
      }),
    ];
  }, [displayDay, firstDayOfMonth, numDaysPerMonth, taskLists, emptyList]);

  return (
    <>
      <NewTaskWindow
        openWindow={openWindow}
        setOpenWindow={setOpenWindow}
        taskList={taskLists}
        handleAddTask={handleAddTask}
      ></NewTaskWindow>
      <div className="calendar">
        <div className="header-wrap">
          <h1>Task Tracker</h1>
          <button className="task-button" onClick={() => setOpenWindow(true)}>
            Add Task
          </button>
        </div>

        <div className="month">
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
        </div>

        <div className="weekdays">
          {weekdays.map((day) => (
          <><p className="weekday">{day}</p></>)
          )}
        </div>

        <div className="boxes">
          {boxes}
          {/* {[...Array(firstDayOfMonth)].map((x) => {
            return (
              <Box
                key={x}
                className="box-child"
                day=""
                month=""
                year=""
                taskList={emptyList}
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
                month={displayDay.getMonth()+1}
                year={displayDay.getFullYear()}
                taskList={taskLists}
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
              />
            );
          })} */}
        </div>
      </div>
    </>
  );
}

export default App;
