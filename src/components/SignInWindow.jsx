import "./SignInWindow.css";
import { useState } from "react";
import PropTypes from "prop-types";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../firebase";
import { GoogleButton } from "react-google-button";
import { readUserData } from "../functions/DataBaseFunctions";

function SignInWindow(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        console.log(userCredentials);
      })
      .catch((error) => {
        console.log(error);
      });
    readUserData(auth.currentUser.uid)
      .then((task_list) => {
        props.setTaskLists(task_list);
      })
      .catch((error) => {
        console.error("Error Reading User Data:", error);
      });
    props.setSignInWindow(false);
  };
  const handleSignUp = () => {
    props.setSignInWindow(false);
    props.setSignUpWindow(true);
  };

  const googleSignIn = () => {
    try {
      const googleProvider = new GoogleAuthProvider();
      googleProvider.setCustomParameters({ prompt: "select_account" });
      signInWithPopup(auth, googleProvider);
      // readUserData(auth.currentUser.uid)
      //   .then((task_list) => {
      //     console.log(task_list);
      //     props.setTaskLists(task_list);
      //   })
      //   .catch((error) => {
      //     console.error("Error Reading User Data:", error);
      //   });
    } catch (error) {
      alert("Error sign in with Google ", error);
    }
    props.setSignInWindow(false);
  };

  return props.signInWindow ? (
    <div className="window-wrapper">
      <form onSubmit={handleSubmit}>
        <h1>Sign In</h1>
        <button
          className="close-button"
          onClick={() => props.setSignInWindow(false)}
        >
          X
        </button>
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
          <button className="button" onClick={handleSignUp}>
            Sign Up with Email
          </button>
        </div>
      </form>
    </div>
  ) : (
    ""
  );
}

SignInWindow.propTypes = {
  signInWindow: PropTypes.bool,
  setSignInWindow: PropTypes.func,
  setSignUpWindow: PropTypes.func,
  user: PropTypes.any,
  setUser: PropTypes.func,
  setTaskLists: PropTypes.func,
};

export default SignInWindow;
