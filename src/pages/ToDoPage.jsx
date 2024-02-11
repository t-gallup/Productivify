import "./ToDoPage.css";
import PropTypes from "prop-types";
import Navbar from "../components/Navbar";
import { useState } from "react";
import NewTaskWindow from "../components/NewTaskWindow";
import ToDoItem from "../components/ToDoItem";

function ToDoPage(props) {
  const [openWindow, setOpenWindow] = useState(false);
  const [toDoList, setToDoList] = useState([]);
  const [editDescription, setEditDescription] = useState("");
  const [editDay, setEditDay] = useState("");
  const [editTime, setEditTime] = useState("");
  const [openEditWindow, setOpenEditWindow] = useState(false);

  return (
    <>
      <Navbar user={props.user} setTaskLists={props.setTaskLists} emptyTaskLists={props.emptyTaskLists}></Navbar>
      <NewTaskWindow openWindow={openWindow}
      setOpenWindow={setOpenWindow}
      ></NewTaskWindow>
      <div className="header-wrap">
          <h1>To Do List</h1>
          {toDoList.map((item, day, index) => (
          <ToDoItem
            key={index}
            day={day}
            description={item}
            setEditDescription={setEditDescription}
            setEditDay={setEditDay}
            setOpenEditWindow={setOpenEditWindow}
          />
        ))}
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
    </>
  );
}

ToDoPage.propTypes = {
  user: PropTypes.object,
  setTaskLists: PropTypes.func,
  emptyTaskLists: PropTypes.object,
};

export default ToDoPage;
