import "./SignUpWindow.css"
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useState } from "react";
import PropTypes from "prop-types";
import { writeUserData } from "../functions/DataBaseFunctions";
//TODO: Add label tags to inputs
function SignUpWindow(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handlePasswordConfirmChange = (event) => {
    setPasswordConfirm(event.target.value);
  };
  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   createUserWithEmailAndPassword(auth, email, password)
  //     .then((userCredentials) => {
  //       console.log(userCredentials);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  const handleSignUp = (event) => {
    event.preventDefault();
    
    if (password !== passwordConfirm) {
      alert("Passwords don't match");
    } else {
      const userCredentials = createUserWithEmailAndPassword(auth, email, password);
      userCredentials.then((userCredential) => {
        writeUserData(userCredential.user.uid, props.taskLists);
        props.setSignUpWindow(false);
        props.setSignInWindow(true);
        alert('User created successfully!');
      })
      .catch((error) => {
        console.log(userCredentials);
        const errorCode = error.code
        switch (errorCode) {
          case 'auth/weak-password':
            alert('Password should be at least 6 characters.');
            break;
          case 'auth/email-already-in-use':
            alert('Email address is already in use.');
            break;
          default:
            alert('Error creating user account. Please try again later.');
            console.error(error.message);
        }
      })
    }
  }


  return props.signUpWindow ? (
    <div className="window-wrapper">
      <form onSubmit={handleSignUp}>
        <h1>Create Account</h1>
        <div className="email-wrapper">
          <button
            className="back-button"
            onClick={() => {
              props.setSignUpWindow(false);
              props.setSignInWindow(true);
            }}
          >
            &#10094;
          </button>
          <button
            className="close-button"
            onClick={() => props.setSignUpWindow(false)}
          >
            X
          </button>
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
          <button type="submit" onClick={handleSignUp}>Sign Up</button>
        </div>
        
        {/* <button className="button" onClick={googleSignIn}>
              <i className="fab fa-google"></i>Sign In with Google
            </button> */}
      </form>
    </div>
  ) : (
    ""
  );
}

SignUpWindow.propTypes = {
  signUpWindow: PropTypes.bool,
  setSignUpWindow: PropTypes.func,
  setSignInWindow: PropTypes.func,
  taskLists: PropTypes.any
};
export default SignUpWindow;
