import "./signup.css";
import googleIcon from "../../pictures/googleIcon.png";
import { Link } from "react-router-dom";

export default function SignUp() {
  return (
    <div className="main-container">
      <div className="signup-container">
        <div className="head">Create account</div>

        <button>
          <img src={googleIcon} alt="icon" className="g-icon" />
          Sign in with Google
        </button>

        <div className="or-container">
          <div className="line"></div>
          <div className="or">OR</div>
          <div className="line"></div>
        </div>

        <form>
          <div className="form-group">
            <label for="name">Name</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter your name"
            />
          </div>
          <div className="form-group">
            <label for="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
            />
          </div>
          <div className="form-group">
            <label for="name">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
            />
          </div>
        </form>

        <button className="account ">Create Account</button>

        <div className="link-container">
          <span class="login">Already have an account? </span>
          <Link to="/login" className="login-link">
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
}
