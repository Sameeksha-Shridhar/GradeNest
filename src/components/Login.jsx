import { useState } from "react";

function Login({ onLogin, onCreateAccount }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    const cleanUsername = username.trim();

    if (!cleanUsername || !password) {
      alert("Please enter your username and password.");
      return;
    }

    const savedUsers = localStorage.getItem("gradNestUsers");

    if (!savedUsers) {
      alert("No account found. Please create an account first.");
      return;
    }

    let users;

    try {
      users = JSON.parse(savedUsers);
    } catch {
      alert("Account data is corrupted. Please create an account again.");
      return;
    }

    const user = users.find(
      (item) =>
        item.username.toLowerCase() ===
          cleanUsername.toLowerCase() &&
        item.password === password
    );

    if (!user) {
      alert("Invalid username or password.");
      return;
    }

    onLogin(user.username);
  };

  return (
    <div className="auth-page">
      <div className="auth-card">

        <div className="auth-logo">🎓</div>

        <p className="eyebrow">
          WELCOME TO GRADENEST
        </p>

        <h1>Welcome Back</h1>

        <p className="auth-subtitle">
          Your academic journey, all in one place.
        </p>

        <form onSubmit={handleLogin}>

          <label>
            Username
            <input
              type="text"
              placeholder="Enter your username"
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
              placeholder="Enter your password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
            />
          </label>

          <button
            type="submit"
            className="auth-btn"
          >
            Login
          </button>

        </form>

        <div className="auth-divider">
          <span>Don't have an account?</span>
        </div>

        <button
          className="create-account-btn"
          onClick={onCreateAccount}
        >
          Create Account
        </button>

      </div>
    </div>
  );
}

export default Login;