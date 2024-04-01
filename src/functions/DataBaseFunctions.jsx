import { getDatabase, ref, onValue, set } from "firebase/database";
// import { createNewTaskList, createNumDaysPerMonth } from "./InitializationFunctions";

export function readUserTaskList(userId, emptyTaskList) {
  return new Promise((resolve, reject) => {
    const db = getDatabase();
    var task_list = structuredClone(emptyTaskList);
    const unsubscribe = onValue(
      ref(db, "/users/" + userId),
      (snapshot) => {
        task_list = snapshot.val() && snapshot.val().task_list;
        resolve(task_list);
      },
      {
        onlyOnce: true,
      }
    );
  });
}

export function readUserToDo(userId, emptyTaskList) {
  return new Promise((resolve, reject) => {
    const db = getDatabase();
    var to_do_list = structuredClone(emptyTaskList);
    const unsubscribe = onValue(
      ref(db, "/users/" + userId),
      (snapshot) => {
        to_do_list = snapshot.val() && snapshot.val().to_do_list;
        resolve(to_do_list);
      },
      {
        onlyOnce: true,
      }
    );
  });
}

export function writeUserData(userId, taskList, toDoList) {
  const db = getDatabase();
  set(ref(db, "users/" + userId), {
    task_list: taskList,
    to_do_list: toDoList,
  });
  // console.log(toDoList);
  // console.log(readUserToDo(userId, createNewTaskList(createNumDaysPerMonth(29))));
}
