import React, { useState } from "react";
import "./SignUpPage.css";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "react-feather";

const SignUpPage: React.FC = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    try {
      const response = await fetch("/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName: lastName || null,
          email,
          password,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        if (data.message) {
          setError(data.message);
        } else {
          setError(`Error: ${response.status}`);
        }
        return;
      }
      
      const data = await response.json();
      console.log("Successful authorization:", data);

      
      alert("Confirm your email in your inbox");

      localStorage.setItem("username", data.username);
      navigate("/login");
    } catch (error) {
      setError("Error during registration. Please check the entered data.");
      console.error("Error sending data:", error);
    }
  };
  const handleEyeClickPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    setShowPassword(!showPassword);
  };
  const handleEyeClickConfirmPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="auth-container">
      <h2>Sign Up</h2>

      {error && <p className="error-message">{error}</p>}

      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="first-name">First Name*</label>
          <input
            type="text"
            id="first-name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="your name"
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="last-name">Last Name</label>
          <input
            type="text"
            id="last-name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="your last name"
          />
        </div>
        <div className="input-group">
          <label htmlFor="email">Email Address*</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="john@example.com"
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password*</label>
          <div style={{ position: "relative" }}>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Qwerty123!"
              required
              style={{ paddingRight: "50px" }} 
            />
            <button
              className="eye-icon"
              onClick={handleEyeClickPassword}
              style={{
                position: "absolute",
                right: "30px", 
                top: "50%",
                transform: "translateY(-50%)",
                background: "none",
                border: "none",
                width: "30px",
                height: "50px",
              }}
            >
              {showPassword ? (
                <Eye style={{ color: "black" }} />
              ) : (
                <EyeOff style={{ color: "black" }} />
              )}
            </button>
          </div>
        </div>

        <div className="input-group">
          <label htmlFor="confirm-password">Confirm Password*</label>
          <div style={{ position: "relative" }}>
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirm-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Qwerty123!"
              required
              style={{ paddingRight: "50px" }}
            />
            <button
              className="eye-icon"
              onClick={handleEyeClickConfirmPassword}
              style={{
                position: "absolute",
                right: "30px", 
                top: "50%",
                transform: "translateY(-50%)",
                background: "none",
                border: "none",
                width: "30px",
                height: "50px",
              }}
            >
              {showPassword ? (
                <Eye style={{ color: "black" }} />
              ) : (
                <EyeOff style={{ color: "black" }} />
              )}
            </button>
          </div>
        </div>
        <p className="consent-text">
          By entering the resource, you automatically consent to the processing
          of personal data.
          <a href="/privacy-policy"> Personal Policy</a>
        </p>
        <div className="center">
          <button className="save-button" type="submit">
            Sign Up
          </button>
        </div>
      </form>

      <p>
        Already have an account? <a href="/login">Log In</a>
      </p>
    </div>
  );
};

export default SignUpPage;
