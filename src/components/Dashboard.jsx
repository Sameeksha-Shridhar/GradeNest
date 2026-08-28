function Dashboard({ semesters, cgpa }) {
  const bestSgpa =
    semesters.length > 0
      ? Math.max(
          ...semesters.map((semester) =>
            Number(semester.sgpa)
          )
        ).toFixed(2)
      : "0.00";

  const totalSubjects = semesters.reduce(
    (total, semester) =>
      total +
      (semester.subjects
        ? semester.subjects.length
        : 0),
    0
  );

  return (
    <div className="dashboard-page">

      <div className="dashboard-header">
        <p className="eyebrow">
          WELCOME BACK ✨
        </p>

        <h1>My Academic Notebook</h1>

        <p>
          Your academic journey, all in one place.
        </p>
      </div>

      {/* Quick Overview */}

      <div className="stats-row">

        <div className="stat-card">
          <span className="stat-icon">⭐</span>

          <div>
            <p>Current CGPA</p>
            <h2>{cgpa}</h2>
          </div>
        </div>

        <div className="stat-card">
          <span className="stat-icon">🏅</span>

          <div>
            <p>Best SGPA</p>
            <h2>{bestSgpa}</h2>
          </div>
        </div>

        <div className="stat-card">
          <span className="stat-icon">📚</span>

          <div>
            <p>Total Semesters</p>
            <h2>{semesters.length}</h2>
          </div>
        </div>

        <div className="stat-card">
          <span className="stat-icon">📖</span>

          <div>
            <p>Total Subjects</p>
            <h2>{totalSubjects}</h2>
          </div>
        </div>

      </div>

      {/* Academic Progress */}

      <div className="progress-card">

        <div className="section-heading">

          <div>
            <p className="eyebrow">
              YOUR JOURNEY
            </p>

            <h2>Academic Progress</h2>
          </div>

          <span>📈</span>

        </div>

        <div className="progress-list">

          {semesters.length === 0 ? (

            <div className="empty-state">
              <span>📚</span>

              <h2>
                Your academic journey starts here
              </h2>

              <p>
                Add your first semester to start
                tracking your progress.
              </p>
            </div>

          ) : (

            semesters.map((semester, index) => (

              <div
                className="progress-item"
                key={index}
              >

                <div className="progress-info">

                  <span>
                    {semester.name}
                  </span>

                  <strong>
                    {Number(
                      semester.sgpa
                    ).toFixed(2)}
                  </strong>

                </div>

                <div className="progress-bar">

                  <div
                    className="progress-fill"
                    style={{
                      width: `${
                        Number(semester.sgpa) * 10
                      }%`,
                    }}
                  ></div>

                </div>

              </div>

            ))

          )}

        </div>

      </div>

    </div>
  );
}

export default Dashboard;