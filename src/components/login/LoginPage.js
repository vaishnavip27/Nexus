import "./loginPage.css";
import googleIcon from "../../pictures/googleIcon.png";
import { Link } from "react-router-dom";

export default function LoginPage() {
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

        <form>
          <div className="form-group">
            <label for="name">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter email"
            />
          </div>
          <div className="form-group">
            <label for="email">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter password"
            />
          </div>
        </form>

        <div className="remember-container">
          <label>
            <input type="checkbox" name="remember" className="checkbox" />
            <span className="rm">Remember me</span>
          </label>
          <span className="fp">Forgot password?</span>
        </div>

        <button className="login-button">Log In</button>

        <div className="link-container">
          <span class="login">Don't have an account? </span>
          <Link to="/SignUp" className="login-link">
            Create an account
          </Link>
        </div>
      </div>
    </div>
  );
}
