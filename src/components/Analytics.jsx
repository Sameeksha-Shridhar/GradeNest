function Analytics({ semesters }) {
  const values = semesters.map((semester) =>
    Number(semester.sgpa)
  );

  const average =
    values.length > 0
      ? (
          values.reduce((sum, value) => sum + value, 0) /
          values.length
        ).toFixed(2)
      : "0.00";

  const bestSemester =
    semesters.length > 0
      ? semesters.reduce((best, semester) =>
          Number(semester.sgpa) > Number(best.sgpa)
            ? semester
            : best
        )
      : null;

  const lowestSemester =
    semesters.length > 0
      ? semesters.reduce((lowest, semester) =>
          Number(semester.sgpa) < Number(lowest.sgpa)
            ? semester
            : lowest
        )
      : null;

  let trend = "—";
  let trendText = "Add more semesters to see your trend.";
  let latestChange = "—";

  if (semesters.length >= 2) {
    const previous = Number(
      semesters[semesters.length - 2].sgpa
    );

    const latest = Number(
      semesters[semesters.length - 1].sgpa
    );

    const difference = latest - previous;

    if (difference > 0) {
      trend = "📈 Improving";

      trendText =
        "Your latest SGPA is higher than your previous semester.";

      latestChange = `+${difference.toFixed(2)}`;
    } else if (difference < 0) {
      trend = "📉 Decreasing";

      trendText =
        "Your latest SGPA is lower than your previous semester.";

      latestChange = difference.toFixed(2);
    } else {
      trend = "➡️ Stable";

      trendText =
        "Your SGPA has remained consistent with your previous semester.";

      latestChange = "0.00";
    }
  }

  return (
    <div className="analytics-page">

      {/* Header */}

      <div className="page-heading">

        <div>
          <p className="eyebrow">
            PERFORMANCE
          </p>

          <h1>📊 Analytics</h1>

          <p className="page-subtitle">
            Understand your academic performance
            across semesters.
          </p>
        </div>

      </div>

      {/* Key Insights */}

      <div className="analytics-stats">

        <div className="analytics-stat">

          <span>🏆</span>

          <div>
            <p>Best SGPA</p>

            <strong>
              {bestSemester
                ? Number(bestSemester.sgpa).toFixed(2)
                : "0.00"}
            </strong>

            {bestSemester && (
              <small>
                {bestSemester.name}
              </small>
            )}
          </div>

        </div>

        <div className="analytics-stat">

          <span>📊</span>

          <div>
            <p>Average SGPA</p>

            <strong>
              {average}
            </strong>

            <small>
              Across {semesters.length} semester
              {semesters.length !== 1
                ? "s"
                : ""}
            </small>
          </div>

        </div>

        <div className="analytics-stat">

          <span>🎯</span>

          <div>
            <p>Lowest SGPA</p>

            <strong>
              {lowestSemester
                ? Number(
                    lowestSemester.sgpa
                  ).toFixed(2)
                : "0.00"}
            </strong>

            {lowestSemester && (
              <small>
                {lowestSemester.name}
              </small>
            )}
          </div>

        </div>

      </div>

      {/* SGPA Trend */}

      <div className="analytics-card">

        <div className="analytics-card-header">

          <div>
            <p className="eyebrow">
              PERFORMANCE HISTORY
            </p>

            <h2>
              SGPA Trend
            </h2>
          </div>

          <span className="chart-icon">
            📈
          </span>

        </div>

        <div className="trend-chart">

          {semesters.length === 0 ? (

            <p>
              No semester data available.
            </p>

          ) : (

            semesters.map(
              (semester, index) => {

                const value =
                  Number(
                    semester.sgpa
                  );

                return (
                  <div
                    className="trend-column"
                    key={index}
                  >

                    <div className="trend-value">
                      {value.toFixed(2)}
                    </div>

                    <div className="trend-track">

                      <div
                        className="trend-bar"
                        style={{
                          height: `${value * 10}%`,
                        }}
                      ></div>

                    </div>

                    <span className="trend-label">
                      S{index + 1}
                    </span>

                  </div>
                );
              }
            )

          )}

        </div>

      </div>

      {/* Performance Summary */}

      <div className="analytics-card">

        <div className="analytics-card-header">

          <div>
            <p className="eyebrow">
              SUMMARY
            </p>

            <h2>
              Performance Overview
            </h2>
          </div>

        </div>

        <div className="performance-summary">

          <div>
            <span>
              Current Trend
            </span>

            <strong>
              {trend}
            </strong>
          </div>

          <div>
            <span>
              Latest Change
            </span>

            <strong>
              {latestChange}
            </strong>
          </div>

          <div>
            <span>
              Semesters Completed
            </span>

            <strong>
              {semesters.length}
            </strong>
          </div>

        </div>

        <p className="trend-message">
          {trendText}
        </p>

      </div>

    </div>
  );
}

export default Analytics;