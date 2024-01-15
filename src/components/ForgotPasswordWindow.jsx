import "./ForgotPasswordWindow.css"
import { useState } from "react";
import PropTypes from "prop-types";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase";

function SignUpWindow(props) {
  const [email, setEmail] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleForgotPassword = () => {
    sendPasswordResetEmail(auth, email)
      .then(alert("Reset password email sent."))
      .catch((error) => {
        alert("Error sending reset password email: " + error.message);
      });
  };

  return props.forgotPasswordWindow ? (
    <div className="window-wrapper">
      <form onSubmit={handleForgotPassword}>
        <h1>Forgot Password</h1>
        <div className="email-wrapper">
          <button
            className="back-button"
            onClick={() => {
              props.setForgotPasswordWindow(false);
              props.setSignInWindow(true);
            }}
          >
            &#10094;
          </button>
          <button
            className="close-button"
            onClick={() => props.setForgotPasswordWindow(false)}
          >
            X
          </button>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
          ></input>
          <button type="submit" onClick={handleForgotPassword}>
            Reset Password
          </button>
        </div>
      </form>
    </div>
  ) : (
    ""
  );
}

SignUpWindow.propTypes = {
  forgotPasswordWindow: PropTypes.bool,
  setForgotPasswordWindow: PropTypes.func,
  setSignInWindow: PropTypes.func,
};
export default SignUpWindow;
