import "./ToDoPage.css";
import PropTypes from "prop-types";
import Navbar from "../components/Navbar";
import { useState } from "react";
import NewTaskWindow from "../components/NewTaskWindow";
import ToDoItem from "../components/ToDoItem";

// import {
//   createNumDaysPerMonth,
//   createNewTaskLists,
// } from "../functions/InitializationFunctions";
import EditWindow from "../components/EditWindow";

function ToDoPage(props) {
  const [openWindow, setOpenWindow] = useState(false);
  const [editDescription, setEditDescription] = useState([]);
  const [editDay, setEditDay] = useState("");
  const [openEditWindow, setOpenEditWindow] = useState(false);
  // const [currentDay] = useState(new Date(Date.now()));

  // if (Object.keys(props.toDoList).length == 0) {
  //   const febDays = currentDay.getFullYear() % 4 == 0 ? 29 : 28;
  //   const numDaysPerMonth = createNumDaysPerMonth(febDays);
  //   const newTaskLists = createNewTaskLists(props.taskLists, numDaysPerMonth);
  //   props.setToDoList({ ...newTaskLists });
  //   console.log("Finished set up");
  // }
  return (
    <>
      <Navbar
        user={props.user}
        setUser={props.setUser}
        setTaskLists={props.setTaskLists}
        emptyTaskLists={props.emptyTaskLists}
        setToDoList={props.setToDoList}
      ></Navbar>
      <NewTaskWindow
        openWindow={openWindow}
        setOpenWindow={setOpenWindow}
        taskLists={props.taskLists}
        setTaskLists={props.setTaskLists}
        toDoList={props.toDoList}
        setToDoList={props.setToDoList}
        isToDo={true}
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
        isToDo={true}
      ></EditWindow>
      <div className="to-do-header-wrap">
        <h1>To Do List</h1>
        <button
          className="task-button"
          onClick={() => {
            props.user?.email
              ? setOpenWindow(true)
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
            {Object.entries(props.toDoList).map(([day, tasks]) =>
            tasks.map((description, index) => (
                <ToDoItem
                  key={index}
                  day={day}
                  description={description}
                  setEditDescription={setEditDescription}
                  setEditDay={setEditDay}
                  setOpenEditWindow={setOpenEditWindow}
                  taskLists={props.taskLists}
                  setTaskLists={props.setTaskLists}
                  setOpenWindow={setOpenWindow}
                  toDoList={props.toDoList}
                  setToDoList={props.setToDoList}
                />
            ))
          )}
        </div>
      </div>
        
      
    </>
  );
}

ToDoPage.propTypes = {
  user: PropTypes.object,
  setUser: PropTypes.func,
  setTaskLists: PropTypes.func,
  emptyTaskLists: PropTypes.object,
  taskLists: PropTypes.object,
  toDoList: PropTypes.object,
  setToDoList: PropTypes.func,
};

export default ToDoPage;
