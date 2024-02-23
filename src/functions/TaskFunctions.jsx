import { writeUserData } from "./DataBaseFunctions.jsx";
import { auth } from "../firebase.js";
import {
  createNewTaskLists,
  createNumDaysPerMonth,
} from "./InitializationFunctions.jsx";

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
    var newToDoList = structuredClone(toDoList);
    const key = `${completionDay.substring(0, 4)}-${completionDay
      .substring(5, 7)
      .padStart(2, "0")}-${completionDay.substring(8, 10).padStart(2, "0")}`;
    if (newToDoList[key] === undefined) {
      const numDaysPerMonth = createNumDaysPerMonth(29);
      newToDoList = createNewTaskLists(numDaysPerMonth);
    }
    newToDoList[key].push([taskDescription, completionTime]);
    writeUserData(auth.currentUser.uid, taskLists, newToDoList);
    setToDoList(newToDoList);
  } else {
    var newTaskLists = structuredClone(taskLists);
    const key = `${completionDay.substring(0, 4)}-${completionDay
      .substring(5, 7)
      .padStart(2, "0")}-${completionDay.substring(8, 10).padStart(2, "0")}`;
    if (newTaskLists[key] === undefined) {
      const numDaysPerMonth = createNumDaysPerMonth(29);
      newTaskLists = createNewTaskLists(numDaysPerMonth);
    }
    newTaskLists[key].push([taskDescription, completionTime]);
    writeUserData(auth.currentUser.uid, newTaskLists, toDoList);
    setTaskLists(newTaskLists);
  }
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
    const delIndex = newToDoList[oldKey].findIndex(innerArray => innerArray[0] === String(oldDescription) && innerArray[1] === String(oldTime));
    if (oldKey === newKey) {
      newToDoList[oldKey].splice(delIndex, 1, [newDescription, newTime]);
    } else {
      newToDoList[oldKey].splice(delIndex, 1)
      newToDoList[newKey].push([newDescription, newTime]);
    }
    writeUserData(auth.currentUser.uid, taskLists, newToDoList);
    setToDoList(newToDoList);
  } else {
    const newTaskLists = structuredClone(taskLists);
    const delIndex = newTaskLists[oldKey].findIndex(innerArray => innerArray[0] === String(oldDescription) && innerArray[1] === String(oldTime));
    if (oldKey === newKey) {
      newTaskLists[oldKey].splice(delIndex, 1, [newDescription, newTime]);
    } else {
      newTaskLists[oldKey].splice(delIndex, 1)
      newTaskLists[newKey].push([newDescription, newTime]);
    }
    writeUserData(auth.currentUser.uid, newTaskLists, toDoList);
    setTaskLists(newTaskLists);
  }
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
  isToDo
) {
  const key = `${completionDay.substring(0, 4)}-${completionDay
    .substring(5, 7)
    .padStart(2, "0")}-${completionDay.substring(8, 10).padStart(2, "0")}`;
  if (isToDo) {
    const newToDoList = structuredClone(toDoList);
    if (newToDoList[key] !== undefined) {
      const delIndex = newToDoList[key].findIndex(innerArray => innerArray[0] === String(taskDescription[0]) && innerArray[1] === String(taskDescription[1]));
      newToDoList[key].splice(delIndex, 1);
    }
    writeUserData(auth.currentUser.uid, taskLists, newToDoList);
    setToDoList(newToDoList);
  } else {
    const newTaskLists = structuredClone(taskLists);
    if (newTaskLists[key] !== undefined) {
      const delIndex = newTaskLists[key].findIndex(innerArray => innerArray[0] === String(taskDescription[0]) && innerArray[1] === String(taskDescription[1]));
      newTaskLists[key].splice(delIndex, 1);
    }
    writeUserData(auth.currentUser.uid, newTaskLists, toDoList);
    setTaskLists(newTaskLists);
  }
  setOpenEditWindow(false);
}
