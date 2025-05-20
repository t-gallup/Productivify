import "./ToDoPage.css";
import PropTypes from "prop-types";
import Navbar from "../components/Navbar";
import { useState } from "react";
import NewTaskWindow from "../components/NewTaskWindow";
import ToDoItem from "../components/ToDoItem";

import EditWindow from "../components/EditWindow";
import { DateToKey } from "../functions/DateChanges";
function ToDoPage(props) {
  const [openWindow, setOpenWindow] = useState(false);
  const [editDescription, setEditDescription] = useState([]);
  const [editDay, setEditDay] = useState("");
  const [openEditWindow, setOpenEditWindow] = useState(false);
  const [windowDay, setWindowDay] = useState(DateToKey(new Date()));
  const handleOpenWindow = () => {
    props.setIsToDo(true);
    setOpenWindow(true);
  };
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
        isToDo={props.isToDo}
        setIsToDo={props.setIsToDo}
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
        isToDo={true}
        isHabit={false}
        habitList={props.habitList}
        setHabitList={props.setHabitList}
        windowDay={windowDay}
        setWindowDay={setWindowDay}
      ></EditWindow>
      <div className="to-do-header-wrap">
        <h1>To Do List</h1>
        <button
          className="task-button"
          onClick={() => {
            props.user?.email
              ? handleOpenWindow()
              : alert("Sign in to start adding tasks!");
          }}
        >
          Add To Do Item
        </button>
      </div>
      <div className="to-do-items">
        <div className="column-names">
          <div className="filler"></div>
          <p>Due Date</p>
          <p>Task Description</p>
          <p>Estimated Completion Time</p>
        </div>
        <div className="to-do-grid">
          {Object.entries(props.toDoList).filter(([day, _]) => (day !== "on-00-00") && (day !== "1111-11-11")).map(([day, tasks]) =>
            tasks.map((description, index) => (
              <ToDoItem
                key={index}
                day={day}
                description={description}
                setEditDescription={setEditDescription}
                setEditDay={setEditDay}
                setOpenEditWindow={setOpenEditWindow}
                taskList={props.taskList}
                setTaskList={props.setTaskList}
                setOpenWindow={setOpenWindow}
                toDoList={props.toDoList}
                setToDoList={props.setToDoList}
                habitList={props.habitList}
              />
            ))
          )}
        </div>
        <div>
          <h2 className="no-date-title">No Due Date Items</h2>
            <div className="to-do-grid">
            {Object.entries(props.toDoList).filter(([day, _]) => (day === "on-00-00") || (day === "1111-11-11")).map(([day, tasks]) =>
              tasks.map((description, index) => (
                <ToDoItem
                  key={index}
                  day={day}
                  description={description}
                  setEditDescription={setEditDescription}
                  setEditDay={setEditDay}
                  setOpenEditWindow={setOpenEditWindow}
                  taskList={props.taskList}
                  setTaskList={props.setTaskList}
                  setOpenWindow={setOpenWindow}
                  toDoList={props.toDoList}
                  setToDoList={props.setToDoList}
                  habitList={props.habitList}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}

ToDoPage.propTypes = {
  user: PropTypes.object,
  setUser: PropTypes.func,
  setTaskList: PropTypes.func,
  taskList: PropTypes.object,
  toDoList: PropTypes.object,
  setToDoList: PropTypes.func,
  habitList: PropTypes.object,
  setHabitList: PropTypes.func,
  isToDo: PropTypes.bool,
  setIsToDo: PropTypes.func,
};

export default ToDoPage;
