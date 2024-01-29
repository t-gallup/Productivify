import { getDatabase, ref, onValue, set } from "firebase/database";

export function writeUserData(userId, taskList) {
    const db = getDatabase();
    set(ref(db, 'users/' + userId), {
      task_list: taskList
    });
}

export function readUserData(userId, emptyTaskList, callback, ) {
    const db = getDatabase();

    onValue(ref(db, '/users/' + userId), (snapshot) => {
        const task_list = (snapshot.val() && snapshot.val().task_list) || emptyTaskList;
        callback(null, task_list);
        console.log(task_list);
    }, {
        onlyOnce: true
    });

    // unsubscribe(error => {
    //     callback(error);
    // });
}
