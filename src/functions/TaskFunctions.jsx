import {
  writeUserTask,
  writeUserToDo,
  writeUserHabit,
} from "./DatabaseFunctions.jsx";
import { auth } from "../firebase.js";
// TODO: Change to datetokey
import { DateToKey } from "./DateChanges.jsx";

export function sortDictByKeys(dict) {
  const sortedKeys = Object.keys(dict).sort();
  const sortedDict = {};

  sortedKeys.forEach((key) => {
    sortedDict[key] = dict[key];
  });

  return sortedDict;
}

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
  var key = completionDay;
  if (isToDo) {
    var newToDoList = structuredClone(toDoList);
    // const key = DateToKey(completionDay);
    if (key in newToDoList) {
      newToDoList[key].push([taskDescription, completionTime]);
    } else {
      newToDoList[key] = [[taskDescription, completionTime]];
      newToDoList = sortDictByKeys(newToDoList);
    }
    writeUserToDo(auth.currentUser.uid, newToDoList);
    setToDoList(newToDoList);
    localStorage.setItem("userToDo", JSON.stringify(newToDoList));
  } else {
    var newTaskList = structuredClone(taskList);
    // const key = DateToKey(completionDay);
    if (key in newTaskList) {
      newTaskList[key].push([taskDescription, completionTime]);
    } else {
      newTaskList[key] = [[taskDescription, completionTime]];
    }
    writeUserTask(auth.currentUser.uid, newTaskList);
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
    var newToDoList = structuredClone(toDoList);
    const delIndex = newToDoList[oldKey].findIndex(
      (innerArray) =>
        innerArray[0] === String(oldDescription) &&
        innerArray[1] === String(oldTime)
    );
    if (oldKey === newKey) {
      newToDoList[oldKey].splice(delIndex, 1, [newDescription, newTime]);
    } else {
      newToDoList[oldKey].splice(delIndex, 1);
      if (newKey in newToDoList) {
        newToDoList[newKey].push([newDescription, newTime]);
      } else {
        newToDoList[newKey] = [[newDescription, newTime]];
        newToDoList = sortDictByKeys(newToDoList);
      }
    }
    writeUserToDo(auth.currentUser.uid, newToDoList);
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
      if (newKey in newTaskList) {
        newTaskList[newKey].push([newDescription, newTime]);
      } else {
        newTaskList[newKey] = [[newDescription, newTime]];
      }
    }
    writeUserTask(auth.currentUser.uid, newTaskList);
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
  var key = completionDay;
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
    writeUserToDo(auth.currentUser.uid, newToDoList);
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
    writeUserTask(auth.currentUser.uid, newTaskList);
    setTaskList(newTaskList);
    localStorage.setItem("userTaskList", JSON.stringify(newTaskList));
  }
  setOpenEditWindow(false);
}

export function handleAddHabit(
  name,
  time,
  habitList,
  setHabitList,
  setOpenWindow,
  dayList
) {
  const habitDict = {};
  var newHabitList = structuredClone(habitList);
  habitDict["Name"] = name;
  habitDict["Time"] = time;
  habitDict["Dates"] = {"key": "value"};
  habitDict["Weekdays"] = dayList;
  newHabitList[name] = habitDict;
  newHabitList = sortDictByKeys(newHabitList);
  writeUserHabit(auth.currentUser.uid, newHabitList);
  setHabitList(newHabitList);
  localStorage.setItem("userHabit", JSON.stringify(newHabitList));
  setOpenWindow(false);
}

export function handleEditHabit(
  oldDescription,
  newDescription,
  oldTime,
  newTime,
  setOpenEditWindow,
  habitList,
  setHabitList,
  dayList
) {
  var newHabitList = structuredClone(habitList);
  if (oldDescription !== newDescription) {
    newHabitList[newDescription] = newHabitList[oldDescription];
    newHabitList[newDescription]["Name"] = newDescription;
    delete newHabitList[oldDescription];
    newHabitList = sortDictByKeys(newHabitList);
  }
  newHabitList[newDescription]["Time"] = newTime;
  newHabitList[newDescription]["Weekdays"] = dayList;
  writeUserHabit(auth.currentUser.uid, newHabitList);
  setHabitList(newHabitList);
  localStorage.setItem("userHabit", JSON.stringify(newHabitList));
  setOpenEditWindow(false);
}

export function handleDeleteHabit(
  name,
  habitList,
  setHabitList,
  setOpenEditWindow
) {
  const newHabitList = structuredClone(habitList);
  delete newHabitList[name];
  writeUserHabit(auth.currentUser.uid, newHabitList);
  setHabitList(newHabitList);
  localStorage.setItem("userHabit", JSON.stringify(newHabitList));
  setOpenEditWindow(false);
}
