import "./Auth.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function LoginPage() {
  const navigation = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await axios.post("http://localhost:8080/api/login", {
        email: formData.email,
        password: formData.password,
      });
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("User", JSON.stringify(response.data.data));
      navigation("/");
    } catch (err) {
      setError(
        err.response?.data?.message || "Unable to sign in. Please try again.",
      );
    }
  };
  return (
    <div className="auth-page">
      <div className="auth-brand">
        <div className="auth-logo">A</div>
        <span>API Sentinel</span>
      </div>

      <main className="auth-card">
        <div className="auth-heading">
          <h1>Welcome back</h1>
          <p>Sign in to monitor your APIs and track their health.</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          {error && (
            <p className="auth-error" role="alert">
              {error}
            </p>
          )}
          <div className="auth-field">
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="you@example.com"
              autoComplete="email"
              required
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="auth-field">
            <div className="auth-label-row">
              <label htmlFor="password">Password</label>
              <Link to="/forgot-password" className="auth-link">
                Forgot password?
              </Link>
            </div>

            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              autoComplete="current-password"
              required
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="auth-submit">
            Sign in
          </button>
        </form>

        <div className="auth-divider">
          <span>SECURE API MONITORING</span>
        </div>

        <p className="auth-footer">
          Don't have an account?{" "}
          <Link to="/signup" className="auth-link">
            Create account
          </Link>
        </p>
      </main>

      <p className="auth-bottom-text">
        Reliable monitoring. Clear insights. Better APIs.
      </p>
    </div>
  );
}

export default LoginPage;
