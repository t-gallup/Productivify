import { writeUserData } from "./DataBaseFunctions.jsx";
import { auth } from "../firebase.js";

export function handleAddTask(
  completionDay,
  taskDescription,
  completionTime,
  taskLists,
  setTaskLists,
  setOpenWindow,
  toDoList,
  setToDoList,
  isToDo
) {
  if (isToDo) {
    const newToDoList = structuredClone(toDoList);
    const key = `${completionDay.substring(0, 4)}-${completionDay
      .substring(5, 7)
      .padStart(2, "0")}-${completionDay.substring(8, 10).padStart(2, "0")}`;
    if (newToDoList[key] !== undefined) {
      newToDoList[key].push([taskDescription, completionTime]);
    }
    setToDoList({ ...newToDoList });
  } else {
    const newTaskLists = structuredClone(taskLists);
    const key = `${completionDay.substring(0, 4)}-${completionDay
      .substring(5, 7)
      .padStart(2, "0")}-${completionDay.substring(8, 10).padStart(2, "0")}`;
    if (newTaskLists[key] !== undefined) {
      newTaskLists[key].push([taskDescription, completionTime]);
    }
    setTaskLists({ ...newTaskLists });
  }

  writeUserData(auth.currentUser.uid, taskLists, toDoList);
  setOpenWindow(false);
  
}

export function handleEditTask(
  oldDay,
  newDay,
  oldDescription,
  newDescription,
  oldTime,
  newTime,
  taskLists,
  setTaskLists,
  setOpenEditWindow,
  toDoList,
  setToDoList,
  isToDo
) {
  const oldKey = `${oldDay.substring(0, 4)}-${oldDay
    .substring(5, 7)
    .padStart(2, "0")}-${oldDay.substring(8, 10).padStart(2, "0")}`;
  const newKey = `${newDay.substring(0, 4)}-${newDay
    .substring(5, 7)
    .padStart(2, "0")}-${newDay.substring(8, 10).padStart(2, "0")}`;
  if (isToDo) {
    const newToDoList = structuredClone(toDoList);
    const delIndex = newToDoList[oldKey].indexOf([oldDescription, oldTime]);
    newToDoList[oldKey].splice(delIndex, 1);
    newToDoList[newKey].push([newDescription, newTime]);
    setToDoList({ ...newToDoList });
  } else {
    const newTaskLists = structuredClone(taskLists);
    const delIndex = newTaskLists[oldKey].indexOf([oldDescription, oldTime]);
    newTaskLists[oldKey].splice(delIndex, 1);
    newTaskLists[newKey].push([newDescription, newTime]);
    setTaskLists({ ...newTaskLists });
  }
  writeUserData(auth.currentUser.uid, taskLists, toDoList);
  setOpenEditWindow(false);
  
}

export function handleDeleteTask(
  completionDay,
  taskDescription,
  taskLists,
  setTaskLists,
  setOpenEditWindow,
  toDoList,
  setToDoList,
  isToDo,
) {
  const key = `${completionDay.substring(0, 4)}-${completionDay
    .substring(5, 7)
    .padStart(2, "0")}-${completionDay.substring(8, 10).padStart(2, "0")}`;
  if (isToDo) {
    const newToDoList = structuredClone(toDoList);
    if (newToDoList[key] !== undefined) {
      const delIndex = newToDoList[key].indexOf(taskDescription);
      newToDoList[key].splice(delIndex, 1);
    }
    setToDoList({ ...newToDoList });
  } else {
    const newTaskLists = structuredClone(taskLists);
    if (newTaskLists[key] !== undefined) {
      const delIndex = newTaskLists[key].indexOf(taskDescription);
      newTaskLists[key].splice(delIndex, 1);
    }
    setTaskLists({ ...newTaskLists });
  }
  writeUserData(auth.currentUser.uid, taskLists, toDoList);
  setOpenEditWindow(false);
}
