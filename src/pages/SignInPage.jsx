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
  createNewTaskLists,
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
      const taskLists = await readUserTaskList(
        userCredentials.user.uid,
        props.emptyTaskLists
      );
      if (taskLists === undefined) {
        const numDaysPerMonth = createNumDaysPerMonth(29);
        props.setTaskLists(createNewTaskLists(numDaysPerMonth));
      } else {
        const numDaysPerMonth = createNumDaysPerMonth(29);
        const emptyList = createNewTaskLists(numDaysPerMonth);
        for (var key in taskLists) {
          for (var item of taskLists[key]) {
            emptyList[key].push(item);
          }
        }
        props.setTaskLists(emptyList);
      }
      const toDoList = await readUserToDo(
        userCredentials.user.uid,
        props.emptyTaskLists
      );
      if (toDoList === undefined) {
        const numDaysPerMonth = createNumDaysPerMonth(29);
        props.setToDoList(createNewTaskLists(numDaysPerMonth));
      } else {
        const numDaysPerMonth = createNumDaysPerMonth(29);
        const emptyList = createNewTaskLists(numDaysPerMonth);
        for (var toDoKey in toDoList) {
          for (var toDoItem of toDoList[toDoKey]) {
            emptyList[toDoKey].push(toDoItem);
          }
        }
        props.setToDoList(emptyList);
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
      const taskLists = await readUserTaskList(
        userCredentials.user.uid,
        props.emptyTaskLists
      );
      if (taskLists === undefined) {
        const numDaysPerMonth = createNumDaysPerMonth(29);
        props.setTaskLists(createNewTaskLists(numDaysPerMonth));
      } else {
        const numDaysPerMonth = createNumDaysPerMonth(29);
        const emptyList = createNewTaskLists(numDaysPerMonth);
        for (var key in taskLists) {
          for (var item of taskLists[key]) {
            emptyList[key].push(item);
          }
        }
        props.setTaskLists(emptyList);
      }
      const toDoList = await readUserToDo(
        userCredentials.user.uid,
        props.emptyTaskLists
      );
      if (toDoList === undefined) {
        const numDaysPerMonth = createNumDaysPerMonth(29);
        props.setToDoList(createNewTaskLists(numDaysPerMonth));
      } else {
        const numDaysPerMonth = createNumDaysPerMonth(29);
        const emptyList = createNewTaskLists(numDaysPerMonth);
        for (var toDoKey in toDoList) {
          for (var toDoItem of toDoList[toDoKey]) {
            emptyList[toDoKey].push(toDoItem);
          }
        }
        props.setToDoList(emptyList);
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
  setTaskLists: PropTypes.func,
  emptyTaskLists: PropTypes.object,
  setToDoList: PropTypes.func,
};

export default SignInPage;
