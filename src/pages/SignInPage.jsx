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
import { readUserData } from "../functions/DataBaseFunctions";
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
    var user = "";
    console.log("test");
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        readUserData(userCredentials.user.uid, (error, taskLists) => {
          if (error) {
            alert("Error reading data: " + error.message);
          } else {
            console.log("Task Lists", taskLists);
            props.setTaskLists({...taskLists});
            user = userCredentials;
          }
        });
      })
      .catch((error) => {
        alert("Error signing in: " + error.message);
      });
    console.log("User", user);
    if (!auth.currentUser.emailVerified) {
      await signOut(auth);
      alert("Please verify your email before signing in.");
    } else {
      navigate('/');
    }
  };


  const googleSignIn = async () => {
    const googleProvider = new GoogleAuthProvider();
    googleProvider.setCustomParameters({ prompt: "select_account" });
    await signInWithPopup(auth, googleProvider)
      .then((result) => {
        readUserData(
          result.user.uid,
          props.emptyTaskList,
          (error, taskLists) => {
            if (error) {
              alert("Error reading data: " + error.message);
            } else {
              props.setTaskLists({...taskLists});
            }
          }
        );
      })
      .catch((error) => {
        alert("Error sign in with Google " + error.message);
      });
    navigate('/');
  };

  return <>
     <div className="window">
      <button
          className="back-button"
          onClick={() => navigate('/')}
        >
            &#x25c0;
        </button>
        <form onSubmit={() => handleSubmit}>
        
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
          <button className="button" onClick={() => navigate('/sign-up')}>
            Sign Up with Email
          </button>
          <button className="button" onClick={() => navigate('/forgot-password')}>
            Forgot Password
          </button>
        </div>
      </form>
    </div>
  </>
    
}

SignInPage.propTypes = {
  setTaskLists: PropTypes.func,
  emptyTaskList: PropTypes.object,
};

export default SignInPage;
