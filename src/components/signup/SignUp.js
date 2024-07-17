import "./signup.css";
import { Link } from "react-router-dom";

export default function SignUp() {
  return (
    <div className="login-container">
      <div className="head-container">
        <span>Nexus</span>
      </div>

      <div className="form-container">
        <form>
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
          <input type="radio" id="fp" name="fp" value="Forgot password?" />
          <label for="fp">Forgot password?</label>
          <br />

          <button>Signup</button>
          <span>Already a member? </span>
          <Link to="/Login"></Link>
        </form>
      </div>
    </div>
  );
}
