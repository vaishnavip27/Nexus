import "./loginPage.css";

export default function LoginPage() {
  return (
    <div className="login-container">
      <div className="head-container">
        <span>Nexus</span>
      </div>

      <div className="form-container">
        <div className="form-group">
          <label for="email">Email</label>
          <br />
          <input type="email" id="email" name="email" />
        </div>

        <div className="form-container">
          <label for="password">Password</label>
          <br />
          <input type="password" id="password" name="password" />
        </div>
      </div>
    </div>
  );
}
