function Sidebar({ page, setPage, onLogout }) {
  return (
    <aside className="sidebar">

      <div>
        <div className="brand">
          <div className="brand-icon">📖</div>

          <div>
            <h2>GradeNest</h2>
            <p>Academic Notebook</p>
          </div>
        </div>

        <nav className="nav-links">

          <button
            className={page === "dashboard" ? "active-nav" : ""}
            onClick={() => setPage("dashboard")}
          >
            🏠 <span>Dashboard</span>
          </button>

          <button
            className={page === "semesters" ? "active-nav" : ""}
            onClick={() => setPage("semesters")}
          >
            📚 <span>Semesters</span>
          </button>

          <button
            className={page === "achievements" ? "active-nav" : ""}
            onClick={() => setPage("achievements")}
          >
            🏆 <span>Achievements</span>
          </button>

          <button
            className={page === "analytics" ? "active-nav" : ""}
            onClick={() => setPage("analytics")}
          >
            📊 <span>Analytics</span>
          </button>

        </nav>
      </div>
<button
  className={page === "profile" ? "active-nav" : ""}
  onClick={() => setPage("profile")}
>
  👤 <span>Profile</span>
</button>
      <div className="sidebar-footer">

        <div className="sidebar-message">
          <span>✦</span>
          <p>Keep growing!</p>
        </div>

        <button
          className="logout-btn"
          onClick={onLogout}
        >
          🚪 Logout
        </button>

      </div>

    </aside>
  );
}

export default Sidebar;