import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { loginUser } from "../utils/api";
import { getCookie, setCookie } from "../utils/cookies";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  if (getCookie("jwt_token")) {
    return <Navigate to="/" replace />;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setErrorMessage("");

    try {
      const token = await loginUser(email, password);
      setCookie("jwt_token", token);
      navigate("/");
    } catch (err) {
      setErrorMessage(err.message);
    }
  }

  return (
    <main className="login-page">
      <div className="login-card">
        <h1 className="login-title">Go Business</h1>
        <p className="login-subtitle">Sign in to open your referral dashboard.</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="form-input"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              id="password"
              type="password"
              className="form-input"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {errorMessage && (
            <p role="alert" className="error-box">
              {errorMessage}
            </p>
          )}

          <button type="submit" className="submit-button">
            Sign in
          </button>
        </form>
      </div>
    </main>
  );
}

export default Login;
