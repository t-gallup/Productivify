import { getDatabase, ref, onValue, set } from "firebase/database";
// import { auth } from "../firebase.js";

export function writeUserData(userId, taskList) {
    const db = getDatabase();
    set(ref(db, 'users/' + userId), {
      task_list: taskList
    });
}

export function readUserData(userId) {
    const db = getDatabase();
    return new Promise((resolve, reject) => {
        const unsubscribe = onValue(ref(db, '/users/' + userId), (snapshot) => {
            const task_list = (snapshot.val() && snapshot.val().task_list) || 'Anonymous';
            unsubscribe(); // Stop listening to further changes after the initial value is obtained
            resolve(task_list);
        }, {
            onlyOnce: true
        });

        unsubscribe(error => {
            reject(error);
        });
    });
}
