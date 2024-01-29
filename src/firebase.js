import {initializeApp} from 'firebase/app'
import {getAuth} from 'firebase/auth'
// import firebase from 'firebase/app'
import "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyAPYqSGxbDUpthda9XlHN0DIR687RAhnt8",
    authDomain: "productivity-website-a9d5b.firebaseapp.app",
    projectId: "productivity-website-a9d5b",
    storageBucket: "productivity-website-a9d5b.appspot.com",
    messagingSenderId: "1057721005501",
    appId: "1:1057721005501:web:cf27038364b5ade967ced4",
    measurementId: "G-9LLEWVPDJ2"
};

const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);
// const firebaseApp = initializeApp({firebaseConfig});
// export const auth = getAuth(firebaseApp);