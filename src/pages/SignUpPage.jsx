import "./SignUpPage.css";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { auth } from "../firebase";
import { useState } from "react";
import PropTypes from "prop-types";
import { writeUserData } from "../functions/DataBaseFunctions";
import { useNavigate } from "react-router-dom";
//TODO: Add label tags to inputs
function SignUpPage(props) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [displayName, setDisplayName] = useState("");

  const handleDisplayNameChange = (event) => {
    setDisplayName(event.target.value);
  };
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handlePasswordConfirmChange = (event) => {
    setPasswordConfirm(event.target.value);
  };

  const handleSignUp = (event) => {
    event.preventDefault();

    if (password !== passwordConfirm) {
      alert("Passwords don't match");
    } else {
      const actionCodeSettings = {
        url: "https://productivify.net",
      };
      const userCredentials = createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      userCredentials
        .then((userCredential) => {
          writeUserData(userCredential.user.uid, props.taskLists);
          sendEmailVerification(userCredential.user, actionCodeSettings);
          // auth.currentUser.sendEmailVerification(actionCodeSettings);
          navigate('/sign-in');
          alert(
            "User created successfully! Please verify email before signing in."
          );
        })
        .catch((error) => {
          console.log(userCredentials);
          const errorCode = error.code;
          switch (errorCode) {
            case "auth/weak-password":
              alert("Password should be at least 6 characters.");
              break;
            case "auth/email-already-in-use":
              alert("Email address is already in use.");
              break;
            default:
              alert("Error creating user account. Please try again later.");
              console.error(error.message);
          }
        });
    }
  };

  return (
    <div>
      <form onSubmit={handleSignUp}>
        <h1>Create Account</h1>
        <div className="email-wrapper">
          <button
            className="back-button"
            onClick={() => {
              navigate("/sign-in");
            }}
          >
            &#x25c0;
          </button>
          <input
            type="text"
            placeholder="Name"
            value={displayName}
            onChange={handleDisplayNameChange}
          ></input>
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
          <input
            type="password"
            placeholder="Confirm Password"
            value={passwordConfirm}
            onChange={handlePasswordConfirmChange}
          ></input>
          <button type="submit">Sign Up</button>
        </div>
      </form>
    </div>
  );
}

SignUpPage.propTypes = {
  taskLists: PropTypes.any,
};
export default SignUpPage;
