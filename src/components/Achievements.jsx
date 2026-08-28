import { useEffect, useState } from "react";

function Achievements({ semesters, cgpa }) {
  const [showForm, setShowForm] = useState(false);

  const [achievementTitle, setAchievementTitle] = useState("");
  const [achievementDescription, setAchievementDescription] =
    useState("");
  const [achievementIcon, setAchievementIcon] = useState("🏆");

  // Get current logged-in user
  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem("gradNestUser");

    if (savedUser) {
      return JSON.parse(savedUser).username;
    }

    return null;
  });


  const [myAchievements, setMyAchievements] = useState(() => {
    const savedUser = localStorage.getItem("gradNestUser");

    if (!savedUser) {
      return [];
    }

    const username = JSON.parse(savedUser).username;

    const savedAchievements = localStorage.getItem(
      `gradNestAchievements_${username}`
    );

    if (savedAchievements) {
      return JSON.parse(savedAchievements);
    }

    return [];
  });

  // Save achievements for current user
  useEffect(() => {
    if (!currentUser) {
      return;
    }

    localStorage.setItem(
      `gradNestAchievements_${currentUser}`,
      JSON.stringify(myAchievements)
    );
  }, [myAchievements, currentUser]);

  const numericCgpa = Number(cgpa);

  const automaticAchievements = [
    {
      icon: "🥇",
      title: "High Performer",
      description: "Achieved an SGPA of 9.00 or above.",
      unlocked: semesters.some(
        (semester) => Number(semester.sgpa) >= 9
      ),
    },
    {
      icon: "⭐",
      title: "Excellent CGPA",
      description: "Maintained a CGPA of 9.00 or above.",
      unlocked: numericCgpa >= 9,
    },
    {
      icon: "📚",
      title: "Semester Milestone",
      description: "Completed at least 3 semesters.",
      unlocked: semesters.length >= 3,
    },
    {
      icon: "🔥",
      title: "Consistent Performer",
      description: "Maintained an SGPA of 8.00 or above.",
      unlocked:
        semesters.length > 0 &&
        semesters.every(
          (semester) => Number(semester.sgpa) >= 8
        ),
    },
  ];

  const addAchievement = () => {
    if (!achievementTitle.trim()) {
      alert("Please enter an achievement title.");
      return;
    }

    const newAchievement = {
      icon: achievementIcon,
      title: achievementTitle.trim(),
      description:
        achievementDescription.trim() ||
        "A personal achievement.",
    };

    setMyAchievements([
      ...myAchievements,
      newAchievement,
    ]);

    setAchievementTitle("");
    setAchievementDescription("");
    setAchievementIcon("🏆");
    setShowForm(false);
  };

  const deleteAchievement = (index) => {
    const confirmed = window.confirm(
      "Delete this achievement?"
    );

    if (!confirmed) {
      return;
    }

    setMyAchievements(
      myAchievements.filter(
        (_, i) => i !== index
      )
    );
  };

  const unlockedCount = automaticAchievements.filter(
    (achievement) => achievement.unlocked
  ).length;

  return (
    <div className="achievements-page">

      <div className="page-heading">

        <div>
          <p className="eyebrow">MILESTONES</p>

          <h1>🏆 Achievements</h1>

          <p className="page-subtitle">
            Celebrate your academic and personal
            milestones.
          </p>
        </div>

        <button
          className="add-btn"
          onClick={() => setShowForm(!showForm)}
        >
          ＋ Add Achievement
        </button>

      </div>

      {showForm && (
        <div className="form-card">

          <div className="form-header">

            <div>
              <p className="eyebrow">
                PERSONAL MILESTONE
              </p>

              <h2>Add Achievement ✨</h2>
            </div>

            <button
              className="close-btn"
              onClick={() => setShowForm(false)}
            >
              ✕
            </button>

          </div>

          <div className="semester-form">

            <label>
              Achievement Title

              <input
                type="text"
                placeholder="Example: Hackathon Winner"
                value={achievementTitle}
                onChange={(e) =>
                  setAchievementTitle(e.target.value)
                }
              />
            </label>

            <label>
              Description

              <input
                type="text"
                placeholder="Example: Won 1st place in college hackathon"
                value={achievementDescription}
                onChange={(e) =>
                  setAchievementDescription(
                    e.target.value
                  )
                }
              />
            </label>

            <label>
              Choose Icon

              <select
                value={achievementIcon}
                onChange={(e) =>
                  setAchievementIcon(e.target.value)
                }
              >
                <option value="🏆">🏆 Trophy</option>
                <option value="🥇">🥇 Gold</option>
                <option value="⭐">⭐ Star</option>
                <option value="🎓">🎓 Education</option>
                <option value="💻">💻 Coding</option>
                <option value="📜">📜 Certificate</option>
                <option value="🔥">🔥 Streak</option>
                <option value="🚀">🚀 Project</option>
                <option value="🎤">🎤 Event</option>
              </select>
            </label>

            <div className="form-actions">

              <button
                className="cancel-btn"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </button>

              <button
                className="save-btn"
                onClick={addAchievement}
              >
                ✓ Add Achievement
              </button>

            </div>

          </div>

        </div>
      )}

      <div className="achievement-section">

        <div className="section-heading">

          <div>
            <p className="eyebrow">
              AUTOMATIC MILESTONES
            </p>

            <h2>✨ GradeNest Milestones</h2>
          </div>

          <span>
            {unlockedCount}/
            {automaticAchievements.length}
          </span>

        </div>

        <div className="achievement-grid">

          {automaticAchievements.map(
            (achievement, index) => (

              <div
                className={`achievement-card ${
                  achievement.unlocked
                    ? "unlocked"
                    : "locked"
                }`}
                key={index}
              >

                <div className="achievement-icon">
                  {achievement.icon}
                </div>

                <div className="achievement-content">

                  <h2>{achievement.title}</h2>

                  <p>
                    {achievement.description}
                  </p>

                  <span
                    className={
                      achievement.unlocked
                        ? "achievement-status unlocked-status"
                        : "achievement-status locked-status"
                    }
                  >
                    {achievement.unlocked
                      ? "✓ Unlocked"
                      : "🔒 Locked"}
                  </span>

                </div>

              </div>

            )
          )}

        </div>

      </div>

      <div className="achievement-section">

        <div className="section-heading">

          <div>
            <p className="eyebrow">
              YOUR MILESTONES
            </p>

            <h2>🏆 My Achievements</h2>
          </div>

          <span>
            {myAchievements.length}
          </span>

        </div>

        {myAchievements.length === 0 ? (

          <div className="empty-state">

            <span>🌟</span>

            <h2>No personal achievements yet</h2>

            <p>
              Add your certificates, competitions,
              projects, and other accomplishments.
            </p>

            <button
              className="add-btn"
              onClick={() => setShowForm(true)}
            >
              ＋ Add Your First Achievement
            </button>

          </div>

        ) : (

          <div className="achievement-grid">

            {myAchievements.map(
              (achievement, index) => (

                <div
                  className="achievement-card unlocked"
                  key={index}
                >

                  <div className="achievement-icon">
                    {achievement.icon}
                  </div>

                  <div className="achievement-content">

                    <h2>
                      {achievement.title}
                    </h2>

                    <p>
                      {achievement.description}
                    </p>

                    <button
                      className="delete-btn"
                      onClick={() =>
                        deleteAchievement(index)
                      }
                    >
                      🗑️ Delete
                    </button>

                  </div>

                </div>

              )
            )}

          </div>

        )}

      </div>

    </div>
  );
}

export default Achievements;