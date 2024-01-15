import { getDatabase, ref, onValue, set } from "firebase/database";
// import { auth } from "../firebase.js";

export function writeUserData(userId, taskList) {
    const db = getDatabase();
    set(ref(db, 'users/' + userId), {
      task_list: taskList
    });
}

export function readUserData(userId, emptyTaskList, callback, ) {
    const db = getDatabase();

    const unsubscribe = onValue(ref(db, '/users/' + userId), (snapshot) => {
        const task_list = (snapshot.val() && snapshot.val().task_list) || emptyTaskList;
        callback(null, task_list);
    }, {
        onlyOnce: true
    });

    unsubscribe(error => {
        callback(error);
    });
}
