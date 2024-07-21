import "./signup.css";

export default function SignUp() {
  return (
    <div>
      <h1 className="text-5xl font-semibold">Welcome back</h1>
      <p className="font-medium text-lg text-gray-500 mt-4">
        Welcome back! Please enter your details
      </p>
      <div className="mt-8">
        <div>
          <label className="text-lg font-medium">Email</label>
          <input className="" placeholder="Enter your email" />
        </div>
        <div>
          <label>Password</label>
          <input
            className=""
            placeholder="Enter your password"
            type="password"
          />
        </div>
        <div>
          <div>
            <input type="checkbox" id="remember" />
            <label for="remember">Remember me</label>
          </div>
          <button>Forgot password</button>
        </div>
      </div>
    </div>
  );
}
