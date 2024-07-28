import React, { useState, useEffect } from "react";
import "./loginPage.css";
import googleIcon from "../../pictures/googleIcon.png";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../lib/firebase";
import { toast } from "react-toastify";

export default function LoginPage({ onLoginSuccess }) {
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    const storedPassword = localStorage.getItem("password");

    if (storedEmail && storedPassword) {
      setEmail(storedEmail);
      setPassword(storedPassword);
      setRememberMe(true);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Logged in successfully");

      if (rememberMe) {
        localStorage.setItem("email", email);
        localStorage.setItem("password", password);
      } else {
        localStorage.removeItem("email");
        localStorage.removeItem("password");
      }

      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      toast.error("Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
      toast.success("Logged in with Google");
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      toast.error("Google Sign-In failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="main-container">
      <div className="login-container">
        <div className="head">Welcome back!</div>
        <div className="sub-head">Please enter your details</div>

        <button
          className="g-button"
          onClick={handleGoogleSignIn}
          disabled={loading}
        >
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
