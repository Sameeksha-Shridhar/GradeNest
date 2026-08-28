function Profile({ semesters, achievementsCount, onLogout }) {
  const savedUser = localStorage.getItem("gradNestUser");

  const username = savedUser
    ? JSON.parse(savedUser).username
    : "User";

  return (
    <div className="profile-page">

      <div className="page-heading">
        <div>
          <p className="eyebrow">YOUR ACCOUNT</p>

          <h1>👤 Profile</h1>

          <p className="page-subtitle">
            Your GradeNest account and academic overview.
          </p>
        </div>
      </div>

      <div className="profile-card">

        <div className="profile-avatar">
          {username.charAt(0).toUpperCase()}
        </div>

        <div className="profile-info">
          <p className="eyebrow">GRADE NEST ACCOUNT</p>

          <h2>{username}</h2>

          <p>
            Student account
          </p>
        </div>

      </div>

      <div className="profile-stats">

        <div className="profile-stat">
          <span>📚</span>
          <div>
            <p>Semesters</p>
            <strong>{semesters.length}</strong>
          </div>
        </div>

        <div className="profile-stat">
          <span>🏆</span>
          <div>
            <p>Achievements</p>
            <strong>{achievementsCount}</strong>
          </div>
        </div>

        <div className="profile-stat">
          <span>🎓</span>
          <div>
            <p>Status</p>
            <strong>Active</strong>
          </div>
        </div>

      </div>

      <div className="profile-actions">

        <h2>Account</h2>

       <p>
  Your GradeNest data is saved on this device.
</p>

        <button
          className="logout-btn"
          onClick={onLogout}
        >
          🚪 Logout
        </button>

      </div>

    </div>
  );
}

export default Profile;