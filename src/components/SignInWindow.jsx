import { useState } from "react";
import PropTypes from "prop-types";
import { signInWithEmailAndPassword } from "firebase/auth";
import {auth} from "../firebase";

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
    signInWithEmailAndPassword(auth, email, password).then((userCredentials) => {
      console.log(userCredentials);
    }).catch((error) => {
      console.log(error);
    });

  }

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
      </form>
    </div>
  ) : (
    ""
  );
}

SignInWindow.propTypes = {
  signInWindow: PropTypes.bool,
  setSignInWindow: PropTypes.func,
};

export default SignInWindow;
