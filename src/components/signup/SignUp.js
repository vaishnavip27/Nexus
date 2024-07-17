import "./signup.css";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

export default function SignUp() {
  const handleLogin = (e) => {
    e.preventDefault();
  };

  return (
    <div className="signup-container">
      <div className="head-container">
        <span>Nexus</span>
      </div>

      <div className="form-container">
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label for="fname">Name</label>
            <br />
            <input type="text" id="fname" name="fname" />
          </div>
          <div className="form-group">
            <label for="email">Email</label>
            <br />
            <input type="email" id="email" name="email" />
          </div>
          <div className="form-group">
            <label for="password">Password</label>
            <br />
            <input type="password" id="password" name="password" />
          </div>
          <div className="fp">
            <label for="fp">Forgot password?</label>
          </div>
          <br />
          <div className="btn">
            <button className="signup">Signup</button>
          </div>
          <br />
          <span className="login-text">Already a member? </span>
          <Link to="/Login" className="login-link">
            Log In
          </Link>
        </form>
      </div>
    </div>
  );
}
