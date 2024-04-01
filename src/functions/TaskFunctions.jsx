import { writeUserData } from "./DataBaseFunctions.jsx";
import { auth } from "../firebase.js";
import {
  createNewTaskList,
  createNumDaysPerMonth,
} from "./InitializationFunctions.jsx";

export function handleAddTask(
  completionDay,
  taskDescription,
  completionTime,
  taskList,
  setTaskList,
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
      newToDoList = createNewTaskList(numDaysPerMonth);
    }
    newToDoList[key].push([taskDescription, completionTime]);
    writeUserData(auth.currentUser.uid, taskList, newToDoList);
    setToDoList(newToDoList);
    localStorage.setItem("userToDo", JSON.stringify(newToDoList));
  } else {
    var newTaskList = structuredClone(taskList);
    const key = `${completionDay.substring(0, 4)}-${completionDay
      .substring(5, 7)
      .padStart(2, "0")}-${completionDay.substring(8, 10).padStart(2, "0")}`;
    if (newTaskList[key] === undefined) {
      const numDaysPerMonth = createNumDaysPerMonth(29);
      newTaskList = createNewTaskList(numDaysPerMonth);
    }
    newTaskList[key].push([taskDescription, completionTime]);
    writeUserData(auth.currentUser.uid, newTaskList, toDoList);
    setTaskList(newTaskList);
    localStorage.setItem("userTaskList", JSON.stringify(newTaskList));
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
  taskList,
  setTaskList,
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
    const delIndex = newToDoList[oldKey].findIndex(
      (innerArray) =>
        innerArray[0] === String(oldDescription) &&
        innerArray[1] === String(oldTime)
    );
    if (oldKey === newKey) {
      newToDoList[oldKey].splice(delIndex, 1, [newDescription, newTime]);
    } else {
      newToDoList[oldKey].splice(delIndex, 1);
      newToDoList[newKey].push([newDescription, newTime]);
    }
    writeUserData(auth.currentUser.uid, taskList, newToDoList);
    setToDoList(newToDoList);
    localStorage.setItem("userToDo", JSON.stringify(newToDoList));
  } else {
    const newTaskList = structuredClone(taskList);
    const delIndex = newTaskList[oldKey].findIndex(
      (innerArray) =>
        innerArray[0] === String(oldDescription) &&
        innerArray[1] === String(oldTime)
    );
    if (oldKey === newKey) {
      newTaskList[oldKey].splice(delIndex, 1, [newDescription, newTime]);
    } else {
      newTaskList[oldKey].splice(delIndex, 1);
      newTaskList[newKey].push([newDescription, newTime]);
    }
    writeUserData(auth.currentUser.uid, newTaskList, toDoList);
    setTaskList(newTaskList);
    localStorage.setItem("userTaskList", JSON.stringify(newTaskList));
  }
  setOpenEditWindow(false);
}

export function handleDeleteTask(
  completionDay,
  taskDescription,
  taskList,
  setTaskList,
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
      const delIndex = newToDoList[key].findIndex(
        (innerArray) =>
          innerArray[0] === String(taskDescription[0]) &&
          innerArray[1] === String(taskDescription[1])
      );
      newToDoList[key].splice(delIndex, 1);
    }
    writeUserData(auth.currentUser.uid, taskList, newToDoList);
    setToDoList(newToDoList);
    localStorage.setItem("userToDo", JSON.stringify(newToDoList));
  } else {
    const newTaskList = structuredClone(taskList);
    if (newTaskList[key] !== undefined) {
      const delIndex = newTaskList[key].findIndex(
        (innerArray) =>
          innerArray[0] === String(taskDescription[0]) &&
          innerArray[1] === String(taskDescription[1])
      );
      newTaskList[key].splice(delIndex, 1);
    }
    writeUserData(auth.currentUser.uid, newTaskList, toDoList);
    setTaskList(newTaskList);
    localStorage.setItem("userTaskList", JSON.stringify(newTaskList));
  }
  setOpenEditWindow(false);
}
