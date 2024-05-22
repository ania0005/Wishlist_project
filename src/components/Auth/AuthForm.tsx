import React, { useContext, useState } from "react";
import "./AuthForm.css";
import { useNavigate} from "react-router-dom";
import AuthContext from "../../contexts/AuthContext";

const AuthForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

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
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      console.log("Successful authorization:", data);
    
    const {user} = data;
    if(setUser){setUser(user)}; 
      navigate("/dashboard");
      
    } catch (error) {
      setError("Error during authorization. Please check the entered data.");
      console.error("Error sending data:", error);
    }
  };

  return (
    <body>    
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
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="At least 8 characters" //
            required
          />
        </div>

        <p className="consent-text">
          By entering the resource, you automatically consent to the processing
          of personal data.
          <a href="/privacy-policy"> Personal Policy</a>
        </p>
        <div className="center">
        <button className="save-button" type="submit">Log In</button>
        </div>
      </form>
      <p>
        Don't have an account? <a href="/signup">Sign Up</a>
      </p>
    </div>
    </body>
  );
};

export default AuthForm;