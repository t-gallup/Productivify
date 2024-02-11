import { writeUserData } from "./DataBaseFunctions.jsx";
import { auth } from "../firebase.js";


export function handleAddTask(completionDay, taskDescription, completionTime, taskLists, setTaskLists, setOpenWindow) {
    const newTaskLists = { ...taskLists };
    const key = `${completionDay.substring(0, 4)}-${completionDay
      .substring(5, 7)
      .padStart(2, "0")}-${completionDay.substring(8, 10).padStart(2, "0")}`;
    if (newTaskLists[key] !== undefined) {
      newTaskLists[key].push([taskDescription, completionTime]);
    }

    setTaskLists({ ...newTaskLists });
    writeUserData(auth.currentUser.uid, taskLists);
    setOpenWindow(false);
}
    
export function handleEditTask(oldDay, newDay, oldDescription, newDescription, oldTime, newTime, taskLists, setTaskLists, setOpenEditWindow) {
  console.log(oldDescription, oldTime);
  const oldKey = `${oldDay.substring(0, 4)}-${oldDay
      .substring(5, 7)
      .padStart(2, "0")}-${oldDay.substring(8, 10).padStart(2, "0")}`;
  const newKey = `${newDay.substring(0, 4)}-${newDay
    .substring(5, 7)
    .padStart(2, "0")}-${newDay.substring(8, 10).padStart(2, "0")}`;
  console.log(taskLists);
    const newTaskLists = { ...taskLists };
  console.log(newTaskLists);
  const delIndex = newTaskLists[oldKey].indexOf([oldDescription, oldTime]);
  newTaskLists[oldKey].splice(delIndex, 1);
  newTaskLists[newKey].push([newDescription, newTime]);
  setTaskLists({ ...newTaskLists });
  writeUserData(auth.currentUser.uid, taskLists);
  setOpenEditWindow(false);
}

export function handleDeleteTask(completionDay, taskDescription, taskLists, setTaskLists, setOpenEditWindow) {
  const newTaskLists = { ...taskLists };
  const key = `${completionDay.substring(0, 4)}-${completionDay
    .substring(5, 7)
    .padStart(2, "0")}-${completionDay.substring(8, 10).padStart(2, "0")}`;

  if (newTaskLists[key] !== undefined) {
    const delIndex = newTaskLists[key].indexOf(taskDescription);
    newTaskLists[key].splice(delIndex, 1);
  }
  setTaskLists({ ...newTaskLists });
  writeUserData(auth.currentUser.uid, taskLists);
  setOpenEditWindow(false);
}