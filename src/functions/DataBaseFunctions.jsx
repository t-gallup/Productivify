import { getDatabase, ref, onValue, set } from "firebase/database";

export function writeUserData(userId, taskList) {
  const db = getDatabase();
  set(ref(db, "users/" + userId), {
    task_list: taskList,
  });
}


export function readUserData(userId, emptyTaskList) {
    return new Promise((resolve, reject) => {
        const db = getDatabase();
      var task_list = emptyTaskList;
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
