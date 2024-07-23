import React, { useState } from "react";
import "./loginPage.css";
import googleIcon from "../../pictures/googleIcon.png";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../lib/firebase";
import { toast } from "react-toastify";

export default function LoginPage({ onLoginSuccess }) {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target);
    const { email, password } = Object.fromEntries(formData);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Logged in successfully");
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="main-container">
      <div className="login-container">
        <div className="head">Welcome back!</div>
        <div className="sub-head">Please enter your details</div>

        <button>
          <img src={googleIcon} alt="icon" className="g-icon" />
          Sign in with Google
        </button>

        <div className="or-container">
          <div className="line"></div>
          <div className="or">OR</div>
          <div className="line"></div>
        </div>

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter email"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter password"
              required
            />
          </div>

          <div className="remember-container">
            <label>
              <input type="checkbox" name="remember" className="checkbox" />
              <span className="rm">Remember me</span>
            </label>
            <span className="fp">Forgot password?</span>
          </div>

          <button className="login-button" disabled={loading}>
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>

        <div className="link-container">
          <span id="login">Don't have an account? </span>
          <Link to="/SignUp" className="login-link">
            Create an account
          </Link>
        </div>
      </div>
    </div>
  );
}
