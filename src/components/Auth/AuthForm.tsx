import React, { useContext, useState } from "react";
import "./AuthForm.css";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../contexts/AuthContext";
import { Eye, EyeOff } from "react-feather";

const AuthForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await fetch("/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
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

      const { user } = data;
      if (setUser) {
        setUser(user);
      }
      navigate("/dashboard");
    } catch (error) {
      setError("Error during authorization. Please check the entered data.");
      console.error("Error sending data:", error);
    }
  };

  const handleEyeClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setShowPassword(!showPassword);
  };

  return (
    <div className="auth-container">
      <h2>Log In</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="email">Email Address</label>
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
          <label htmlFor="password">Password</label>
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
              onClick={handleEyeClick}
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
          of personal data. <a href="/privacy-policy"> Personal Policy</a>
        </p>
        <div className="center">
          <button className="save-button" type="submit">
            Log In
          </button>
        </div>
      </form>
      <p>
        Don't have an account? <a href="/signup">Sign Up</a>
      </p>
    </div>
  );
};

export default AuthForm;
