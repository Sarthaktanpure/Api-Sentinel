import { useState } from "react";
import "./Auth.css";
import { Link } from "react-router-dom";
import axios from "axios";

function SignupPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8080/api/signup", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });
      localStorage.setItem("token", response.data.token);
      const user = localStorage.setItem("User", response.data);
      console.log(response.data);
      alert("Signup successfull");
    } catch (err) {
      console.log("Error occur", err.message);
      alert(err.reponse?.data?.message);
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
          <h1>Create your account</h1>
          <p>Start monitoring your endpoints from one place.</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="auth-field">
            <label htmlFor="name">Full name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your full name"
              autoComplete="name"
              required
              value={formData.name}
              onChange={handleChange}
            />
          </div>

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
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Create a password"
              autoComplete="new-password"
              required
              value={formData.password}
              onChange={handleChange}
            />
            <span className="auth-hint">
              Choose a strong password to protect your account.
            </span>
          </div>

          <div className="auth-field">
            <label htmlFor="confirmPassword">Confirm password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Re-enter your password"
              autoComplete="new-password"
              required
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="auth-submit">
            Create account
          </button>
        </form>

        <div className="auth-divider">
          <span>SECURE API MONITORING</span>
        </div>

        <p className="auth-footer">
          Already have an account?{" "}
          <Link to="/login" className="auth-link">
            Sign in
          </Link>
        </p>
      </main>

      <p className="auth-bottom-text">
        Reliable monitoring. Clear insights. Better APIs.
      </p>
    </div>
  );
}

export default SignupPage;
