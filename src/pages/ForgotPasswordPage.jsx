import "./ForgotPasswordPage.css"
import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

function ForgotPasswordPage() {
  const [email, setEmail] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleForgotPassword = (event) => {
    event.preventDefault();
    sendPasswordResetEmail(auth, email)
      .then(alert("Reset password email sent."))
      .catch((error) => {
        alert("Error sending reset password email: " + error.message);
      });
  };
  const navigate = useNavigate();

  return (
    <div>
      <form onSubmit={handleForgotPassword}>
        <h1>Forgot Password</h1>
        <div className="email-wrapper">
          <button
            className="back-button"
            onClick={() => navigate('/sign-in')}
          >
            &#x25c0;
          </button>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
          ></input>
          <button type="submit">
            Reset Password
          </button>
        </div>
      </form>
    </div>
  )
}

export default ForgotPasswordPage;
