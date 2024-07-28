import "./signup.css";
import googleIcon from "../../pictures/googleIcon.png";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db, googleProvider } from "../../lib/firebase";
import { useState } from "react";
import { toast } from "react-toastify";

export default function SignUp() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target);
    const { username, email, password } = Object.fromEntries(formData);

    if (!username || !email || !password) {
      setLoading(false);
      return;
    }

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      await Promise.all([
        setDoc(doc(db, "users", res.user.uid), {
          username,
          email,
          id: res.user.uid,
        }),

        setDoc(doc(db, "userchats", res.user.uid), {
          chats: [],
        }),
      ]);

      toast.success("Account created successfully");
      navigate("/login"); // Redirect to login page after successful signup
    } catch (error) {
      console.log(error);
      toast.error("Signup failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      // Check if the user already exists in Firestore
      const userDoc = doc(db, "users", user.uid);
      const userSnapshot = await userDoc.get();

      if (!userSnapshot.exists()) {
        // If not, create a new user document
        await setDoc(userDoc, {
          username: user.displayName,
          email: user.email,
          id: user.uid,
        });

        await setDoc(doc(db, "userchats", user.uid), {
          chats: [],
        });
      }

      toast.success("Signed up with Google");
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
      <div className="signup-container">
        <div className="head">Create account</div>

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

        <form onSubmit={handleRegister}>
          <div className="form-group">
            <label htmlFor="username">Name</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter your name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              name="password"
            />
          </div>

          <button type="submit" className="account" disabled={loading}>
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <div className="link-container">
          <span className="login">Already have an account? </span>
          <Link to="/login" className="login-link">
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
}
