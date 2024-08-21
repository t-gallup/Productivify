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
import {
  readUserTaskList,
  readUserToDo,
  readUserHabit,
  writeUserHabit,
} from "../functions/DatabaseFunctions";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

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
      let taskList = await readUserTaskList(userCredentials.user.uid);
      if (taskList === undefined) {
        taskList = {};
      }
      props.setTaskList(taskList);
      localStorage.setItem("userTaskList", JSON.stringify(taskList));

      let toDoList = await readUserToDo(userCredentials.user.uid);
      if (toDoList === undefined) {
        toDoList = {};
      }
      props.setToDoList(toDoList);
      localStorage.setItem("userToDo", JSON.stringify(toDoList));

      let habitList = await readUserHabit(userCredentials.user.uid);
      if (habitList === undefined) {
        habitList = {};
      }
      for (const habit in habitList) {
        if (!("Weekdays" in habitList[habit])) {
          habitList[habit]["Weekdays"] = [true, true, true, true, true, true, true];
          writeUserHabit(userCredentials.user.uid, habitList);
        }
      }
      props.setHabitList(habitList);
      localStorage.setItem("userHabit", JSON.stringify(habitList));
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
      let taskList = await readUserTaskList(userCredentials.user.uid);
      if (taskList === undefined) {
        taskList = {};
      }
      props.setTaskList(taskList);
      localStorage.setItem("userTaskList", JSON.stringify(taskList));

      let toDoList = await readUserToDo(userCredentials.user.uid);
      if (toDoList === undefined) {
        toDoList = {};
      }
      props.setToDoList(toDoList);
      localStorage.setItem("userToDo", JSON.stringify(toDoList));

      let habitList = await readUserHabit(userCredentials.user.uid);
      if (habitList === undefined) {
        habitList = {};
      }
      for (const habit in habitList) {
        if (!"Weekdays" in habitList[habit]) {
          habitList[habit]["Weekdays"] = [true, true, true, true, true, true, true];
          writeUserHabit(userCredentials.user.uid, habitList);
        }
      }
      props.setHabitList(habitList);
      localStorage.setItem("userHabit", JSON.stringify(habitList));

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
        <form onSubmit={handleSubmit} className="window">
          <h1>Sign In</h1>
          <div className="content-wrapper">
            <div className="sign-in-email-wrapper">
              <h2 className="sign-in-headers">Email</h2>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={handleEmailChange}
                className="sign-in-input"
              ></input>
              <h2 className="sign-in-headers">Password</h2>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
                className="sign-in-input"
              ></input>
              <button className="sign-in-button" type="submit">
                Sign In
              </button>
            </div>
            <div className="sign-in-buttons">
              <GoogleButton className="google-button" onClick={googleSignIn} />
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
          </div>
        </form>
      </div>
    </>
  );
}

SignInPage.propTypes = {
  setTaskList: PropTypes.func,
  setToDoList: PropTypes.func,
  setHabitList: PropTypes.func,
};

export default SignInPage;
