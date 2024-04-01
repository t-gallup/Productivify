import "./SignInPage.css";
import { useState } from "react";
import PropTypes from "prop-types";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../firebase";
import { GoogleButton } from "react-google-button";
import { readUserTaskList, readUserToDo } from "../functions/DataBaseFunctions";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import {
  createNewTaskList,
  createNumDaysPerMonth,
} from "../functions/InitializationFunctions";

function SignInPage(props) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const taskList = await readUserTaskList(
        userCredentials.user.uid,
        props.emptyTaskList
      );
      if (taskList === undefined) {
        const numDaysPerMonth = createNumDaysPerMonth(29);
        let taskList = createNewTaskList(numDaysPerMonth);
        props.setTaskList(taskList);
        localStorage.setItem("userTaskList", JSON.stringify(taskList));
      } else {
        const numDaysPerMonth = createNumDaysPerMonth(29);
        const emptyList = createNewTaskList(numDaysPerMonth);
        for (var key in taskList) {
          for (var item of taskList[key]) {
            emptyList[key].push(item);
          }
        }
        props.setTaskList(emptyList);
        localStorage.setItem("userTaskList", JSON.stringify(taskList));
      }
      let toDoList = await readUserToDo(
        userCredentials.user.uid,
        props.emptyTaskList
      );
      if (toDoList === undefined) {
        const numDaysPerMonth = createNumDaysPerMonth(29);
        toDoList = createNewTaskList(numDaysPerMonth);
        props.setToDoList(toDoList);
        localStorage.setItem("userToDo", JSON.stringify(toDoList));
      } else {
        const numDaysPerMonth = createNumDaysPerMonth(29);
        const emptyList = createNewTaskList(numDaysPerMonth);
        for (var toDoKey in toDoList) {
          for (var toDoItem of toDoList[toDoKey]) {
            emptyList[toDoKey].push(toDoItem);
          }
        }
        props.setToDoList(emptyList);
        localStorage.setItem("userToDo", JSON.stringify(emptyList));
      }
      if (!auth.currentUser.emailVerified) {
        await signOut(auth);
        alert("Please verify your email before signing in.");
      } else {
        navigate("/");
      }
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  const googleSignIn = async () => {
    const googleProvider = new GoogleAuthProvider();
    googleProvider.setCustomParameters({ prompt: "select_account" });
    try {
      const userCredentials = await signInWithPopup(auth, googleProvider);
      let taskList = await readUserTaskList(
        userCredentials.user.uid,
        props.emptyTaskList
      );
      if (taskList === undefined) {
        const numDaysPerMonth = createNumDaysPerMonth(29);
        taskList = createNewTaskList(numDaysPerMonth);
        props.setTaskList(taskList);
        localStorage.setItem("userTaskList", JSON.stringify(taskList));
      } else {
        const numDaysPerMonth = createNumDaysPerMonth(29);
        const emptyList = createNewTaskList(numDaysPerMonth);
        for (var key in taskList) {
          for (var item of taskList[key]) {
            emptyList[key].push(item);
          }
        }
        props.setTaskList(emptyList);
        localStorage.setItem("userTaskList", JSON.stringify(emptyList));
      }
      let toDoList = await readUserToDo(
        userCredentials.user.uid,
        props.emptyTaskList
      );
      if (toDoList === undefined) {
        const numDaysPerMonth = createNumDaysPerMonth(29);
        toDoList = createNewTaskList(numDaysPerMonth);
        props.setToDoList(toDoList);
        localStorage.setItem("userToDo", JSON.stringify(toDoList));
      } else {
        const numDaysPerMonth = createNumDaysPerMonth(29);
        const emptyList = createNewTaskList(numDaysPerMonth);
        for (var toDoKey in toDoList) {
          for (var toDoItem of toDoList[toDoKey]) {
            emptyList[toDoKey].push(toDoItem);
          }
        }
        props.setToDoList(emptyList);
        localStorage.setItem("userToDo", JSON.stringify(emptyList));
      }
      navigate("/");
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  return (
    <>
      <div className="window">
        <button className="back-button" onClick={() => navigate("/")}>
          &#x25c0;
        </button>
        <form onSubmit={handleSubmit}>
          <h1>Sign In</h1>
          <div className="email-wrapper">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={handleEmailChange}
            ></input>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
            ></input>
            <button type="submit">Sign In</button>
          </div>
          <div className="sign-in-buttons">
            <GoogleButton onClick={googleSignIn} />
            <button className="button" onClick={() => navigate("/sign-up")}>
              Sign Up with Email
            </button>
            <button
              className="button"
              onClick={() => navigate("/forgot-password")}
            >
              Forgot Password
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

SignInPage.propTypes = {
  setTaskList: PropTypes.func,
  emptyTaskList: PropTypes.object,
  setToDoList: PropTypes.func,
};

export default SignInPage;
