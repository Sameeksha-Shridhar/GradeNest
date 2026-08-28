import { useEffect, useState } from "react";
import "./App.css";

import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import SemesterPage from "./components/SemesterPage";
import AddSemester from "./components/AddSemester";
import Achievements from "./components/Achievements";
import Analytics from "./components/Analytics";
import Profile from "./components/Profile";
import Login from "./components/Login";
import Signup from "./components/Signup";

function App() {
  const [page, setPage] = useState("dashboard");

  // =========================
  // AUTHENTICATION
  // =========================

  const [authPage, setAuthPage] = useState(() => {
    const loggedIn =
      localStorage.getItem("gradNestLoggedIn");

    return loggedIn === "true"
      ? "app"
      : "login";
  });

  const [currentUser, setCurrentUser] = useState(() => {
    return localStorage.getItem(
      "gradNestCurrentUser"
    );
  });

  // =========================
  // SEMESTERS
  // =========================

  const [semesters, setSemesters] = useState([]);

  // Load the logged-in user's semesters
  useEffect(() => {
    if (!currentUser) {
      setSemesters([]);
      return;
    }

    const savedSemesters =
      localStorage.getItem(
        `gradNestSemesters_${currentUser}`
      );

    if (savedSemesters) {
      try {
        setSemesters(JSON.parse(savedSemesters));
      } catch {
        setSemesters([]);
      }
    } else {
      setSemesters([]);
    }
  }, [currentUser]);

  // Save semesters for the logged-in user
  useEffect(() => {
    if (!currentUser) {
      return;
    }

    localStorage.setItem(
      `gradNestSemesters_${currentUser}`,
      JSON.stringify(semesters)
    );
  }, [semesters, currentUser]);

  // =========================
  // CGPA
  // =========================

  const total = semesters.reduce(
    (sum, semester) =>
      sum + Number(semester.sgpa),
    0
  );

  const cgpa =
    semesters.length > 0
      ? (total / semesters.length).toFixed(2)
      : "0.00";

  // =========================
  // ACHIEVEMENTS
  // =========================

  const [achievementsVersion, setAchievementsVersion] =
    useState(0);

  const achievementsCount = currentUser
    ? JSON.parse(
        localStorage.getItem(
          `gradNestAchievements_${currentUser}`
        ) || "[]"
      ).length
    : 0;

  // Prevent unused variable warning
  void achievementsVersion;

  // =========================
  // LOGIN
  // =========================

  const handleLogin = (username) => {
    setCurrentUser(username);

    localStorage.setItem(
      "gradNestLoggedIn",
      "true"
    );

    localStorage.setItem(
      "gradNestCurrentUser",
      username
    );

    setAuthPage("app");
    setPage("dashboard");
  };

  // =========================
  // SIGNUP
  // =========================

  const handleSignup = (username) => {
    setCurrentUser(username);

    localStorage.setItem(
      "gradNestLoggedIn",
      "true"
    );

    localStorage.setItem(
      "gradNestCurrentUser",
      username
    );

    // New account starts empty
    setSemesters([]);

    setAuthPage("app");
    setPage("dashboard");
  };

  // =========================
  // LOGOUT
  // =========================

  const handleLogout = () => {
    localStorage.removeItem(
      "gradNestLoggedIn"
    );

    localStorage.removeItem(
      "gradNestCurrentUser"
    );

    setCurrentUser(null);
    setSemesters([]);

    setAuthPage("login");
    setPage("dashboard");
  };

  // =========================
  // LOGIN PAGE
  // =========================

  if (authPage === "login") {
    return (
      <Login
        onLogin={handleLogin}
        onCreateAccount={() =>
          setAuthPage("signup")
        }
      />
    );
  }

  // =========================
  // SIGNUP PAGE
  // =========================

  if (authPage === "signup") {
    return (
      <Signup
        onSignup={handleSignup}
        onBackToLogin={() =>
          setAuthPage("login")
        }
      />
    );
  }

  // =========================
  // MAIN APPLICATION
  // =========================

  return (
    <div className="app-container">

      <Sidebar
        page={page}
        setPage={setPage}
        onLogout={handleLogout}
      />

      <main className="content">

        {page === "dashboard" && (
          <Dashboard
            semesters={semesters}
            cgpa={cgpa}
          />
        )}

        {page === "semesters" && (
          <SemesterPage
            semesters={semesters}
            setSemesters={setSemesters}
          />
        )}

        {page === "add" && (
          <AddSemester
            semesters={semesters}
            setSemesters={setSemesters}
          />
        )}

        {page === "achievements" && (
          <Achievements
            semesters={semesters}
            cgpa={cgpa}
          />
        )}

        {page === "analytics" && (
          <Analytics
            semesters={semesters}
          />
        )}

        {page === "profile" && (
          <Profile
            semesters={semesters}
            achievementsCount={achievementsCount}
            onLogout={handleLogout}
          />
        )}

      </main>

    </div>
  );
}

export default App;