import "./signup.css";
import googleIcon from "../../pictures/googleIcon.png";

export default function SignUp() {
  return (
    <div className="main-container">
      <div className="signup-container">
        <div className="head">Create account</div>

        <button>
          <img src={googleIcon} alt="icon" className="g-icon" />
          Sign in with Google
        </button>

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
      </div>
    </div>
  );
}
