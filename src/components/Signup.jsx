import { useState } from "react";

function Signup({ onSignup, onBackToLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  const handleSignup = (e) => {
    e.preventDefault();

    const cleanUsername = username.trim();

    if (!cleanUsername || !password || !confirmPassword) {
      alert("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters.");
      return;
    }

    const savedUsers =
      localStorage.getItem("gradNestUsers");

    let users = [];

    if (savedUsers) {
      try {
        users = JSON.parse(savedUsers);
      } catch {
        users = [];
      }
    }

    const exists = users.some(
      (user) =>
        user.username.toLowerCase() ===
        cleanUsername.toLowerCase()
    );

    if (exists) {
      alert(
        "Username already exists. Please choose another."
      );
      return;
    }

    const newUser = {
      username: cleanUsername,
      password: password,
    };

    users.push(newUser);

    localStorage.setItem(
      "gradNestUsers",
      JSON.stringify(users)
    );

    // Give the new user empty data
    localStorage.setItem(
      `gradNestSemesters_${cleanUsername}`,
      JSON.stringify([])
    );

    localStorage.setItem(
      `gradNestAchievements_${cleanUsername}`,
      JSON.stringify([])
    );

    alert("Account created successfully!");

    onSignup(cleanUsername);
  };

  return (
    <div className="auth-page">
      <div className="auth-card">

        <div className="auth-logo">🎓</div>

        <p className="eyebrow">
          JOIN GRADENEST
        </p>

        <h1>Create Account</h1>

        <p className="auth-subtitle">
          Start organizing your academic journey.
        </p>

        <form onSubmit={handleSignup}>

          <label>
            Username
            <input
              type="text"
              placeholder="Choose a username"
              value={username}
              onChange={(e) =>
                setUsername(e.target.value)
              }
            />
          </label>

          <label>
            Password
            <input
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
            />
          </label>

          <label>
            Confirm Password
            <input
              type="password"
              placeholder="Re-enter your password"
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(e.target.value)
              }
            />
          </label>

          <button
            type="submit"
            className="auth-btn"
          >
            Create Account
          </button>

        </form>

        <div className="auth-divider">
          <span>Already have an account?</span>
        </div>

        <button
          className="create-account-btn"
          onClick={onBackToLogin}
        >
          Back to Login
        </button>

      </div>
    </div>
  );
}

export default Signup;