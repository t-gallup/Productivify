import { getDatabase, ref, onValue, set, update } from "firebase/database";

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

export function readUserHabit(userId) {
  return new Promise((resolve, reject) => {
    const db = getDatabase();
    // var to_do_list = structuredClone(emptyTaskList);
    var habit_list = {}
    const unsubscribe = onValue(
      ref(db, "/users/" + userId),
      (snapshot) => {
        habit_list = snapshot.val() && snapshot.val().habit_list;
        resolve(habit_list);
      },
      {
        onlyOnce: true,
      }
    );
  });
}

export function writeUserTask(userId, taskList) {
  const db = getDatabase();
  const updates = {};
  updates[`/users/${userId}/task_list`] = taskList;
  update(ref(db), updates);
}

export function writeUserToDo(userId, toDoList) {
    const db = getDatabase();
    const updates = {};
    updates[`/users/${userId}/to_do_list`] = toDoList;
    update(ref(db), updates);
}

export function writeUserHabit(userId, habitList) {
  const db = getDatabase();
  const updates = {};
  updates[`/users/${userId}/habit_list`] = habitList;
  update(ref(db), updates);
}
