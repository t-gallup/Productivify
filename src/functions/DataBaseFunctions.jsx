import { getDatabase, ref, onValue, set } from "firebase/database";

export function writeUserData(userId, taskList, toDoList) {
  const db = getDatabase();
  set(ref(db, "users/" + userId), {
    task_list: taskList,
    to_do_list: toDoList,
  });
}

export function readUserData(userId, emptyTaskList) {
  return new Promise((resolve, reject) => {
    const db = getDatabase();
    var task_list = emptyTaskList;
    var to_do_list = emptyTaskList;
    const unsubscribe = onValue(
      ref(db, "/users/" + userId),
      (snapshot) => {
        task_list = snapshot.val() && snapshot.val().task_list;
        to_do_list = snapshot.val() && snapshot.val().to_do_list;
        resolve(task_list);
        resolve(to_do_list);
      },
      {
        onlyOnce: true,
      }
    );
  });
}
