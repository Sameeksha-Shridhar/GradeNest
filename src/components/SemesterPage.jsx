import { useState } from "react";

function SemesterPage({ semesters, setSemesters }) {
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [openSemester, setOpenSemester] = useState(null);
  const [editIndex, setEditIndex] = useState(null);

  const [semesterName, setSemesterName] = useState("");
  const [sgpa, setSgpa] = useState("");
  const [subjects, setSubjects] = useState("");

  const resetForm = () => {
    setSemesterName("");
    setSgpa("");
    setSubjects("");
    setEditIndex(null);
    setShowForm(false);
  };

  const saveSemester = () => {
    if (!semesterName.trim() || sgpa === "") {
      alert("Please enter semester name and SGPA.");
      return;
    }

    const sgpaValue = parseFloat(sgpa);

    if (sgpaValue < 0 || sgpaValue > 10) {
      alert("SGPA must be between 0 and 10.");
      return;
    }

    const newSemester = {
      name: semesterName.trim(),
      sgpa: sgpaValue,
      subjects: subjects
        .split(",")
        .map((subject) => subject.trim())
        .filter((subject) => subject !== ""),
    };

    if (editIndex !== null) {
      const updatedSemesters = semesters.map(
        (semester, index) =>
          index === editIndex
            ? newSemester
            : semester
      );

      setSemesters(updatedSemesters);
    } else {
      setSemesters([
        ...semesters,
        newSemester,
      ]);
    }

    resetForm();
  };

  const handleEdit = (index) => {
    const semester = semesters[index];

    if (!semester) {
      return;
    }

    setSemesterName(semester.name);
    setSgpa(semester.sgpa.toString());

    setSubjects(
      semester.subjects
        ? semester.subjects.join(", ")
        : ""
    );

    setEditIndex(index);
    setShowForm(true);
  };

  const handleDelete = (index) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this semester?"
    );

    if (!confirmed) {
      return;
    }

    const updatedSemesters = semesters.filter(
      (_, i) => i !== index
    );

    setSemesters(updatedSemesters);

    setOpenSemester(null);
  };

  const filteredSemesters = semesters
    .map((semester, index) => ({
      ...semester,
      originalIndex: index,
    }))
    .filter((semester) =>
      semester.name
        .toLowerCase()
        .includes(search.toLowerCase())
    );

  return (
    <div className="page">

      <div className="page-heading semester-heading">

        <div>
          <p className="eyebrow">
            ACADEMIC RECORD
          </p>

          <h1>📚 My Semesters</h1>

          <p className="page-subtitle">
            Keep your semester results organized
            in one place.
          </p>
        </div>

        <button
          className="add-btn"
          onClick={() => {
            resetForm();
            setShowForm(true);
          }}
        >
          ＋ Add Semester
        </button>

      </div>

      <input
        type="text"
        className="search-box"
        placeholder="🔍 Search semester..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
      />

      {showForm && (
        <div className="form-card">

          <div className="form-header">

            <div>
              <p className="eyebrow">
                {editIndex !== null
                  ? "EDIT RECORD"
                  : "NEW RECORD"}
              </p>

              <h2>
                {editIndex !== null
                  ? "Edit Semester ✏️"
                  : "Add New Semester ✨"}
              </h2>
            </div>

            <button
              className="close-btn"
              onClick={resetForm}
            >
              ✕
            </button>

          </div>

          <div className="semester-form">

            <label>
              Semester Name

              <input
                type="text"
                placeholder="Example: Semester 3"
                value={semesterName}
                onChange={(e) =>
                  setSemesterName(e.target.value)
                }
              />
            </label>

            <label>
              SGPA

              <input
                type="number"
                min="0"
                max="10"
                step="0.01"
                placeholder="Example: 9.25"
                value={sgpa}
                onChange={(e) =>
                  setSgpa(e.target.value)
                }
              />
            </label>

            <label>
              Subjects

              <input
                type="text"
                placeholder="Example: DBMS, Java, OS"
                value={subjects}
                onChange={(e) =>
                  setSubjects(e.target.value)
                }
              />
            </label>

            <div className="form-actions">

              <button
                className="cancel-btn"
                onClick={resetForm}
              >
                Cancel
              </button>

              <button
                className="save-btn"
                onClick={saveSemester}
              >
                {editIndex !== null
                  ? "💾 Save Changes"
                  : "✓ Add Semester"}
              </button>

            </div>

          </div>

        </div>
      )}

      <div className="semester-list">

        {filteredSemesters.length === 0 ? (

          <div className="empty-state">
            <span>📖</span>
            <h2>No semesters found</h2>

            <p>
              Try a different search or add
              a new semester.
            </p>
          </div>

        ) : (

          filteredSemesters.map(
            (semester) => {

              const index =
                semester.originalIndex;

              const isOpen =
                openSemester === index;

              return (
                <div
                  className="semester-card"
                  key={index}
                >

                  <div className="semester-main">

                    <div className="semester-number">
                      {index + 1}
                    </div>

                    <div className="semester-info">

                      <p className="semester-label">
                        ACADEMIC RECORD
                      </p>

                      <h2>
                        {semester.name}
                      </h2>

                      <p className="subject-count">
                        {semester.subjects.length}{" "}
                        subject
                        {semester.subjects.length !== 1
                          ? "s"
                          : ""}
                      </p>

                    </div>

                    <div className="sgpa-display">

                      <span>SGPA</span>

                      <strong>
                        {Number(
                          semester.sgpa
                        ).toFixed(2)}
                      </strong>

                    </div>

                  </div>

                  <div className="semester-actions">

                    <button
                      className="view-btn"
                      onClick={() =>
                        setOpenSemester(
                          isOpen
                            ? null
                            : index
                        )
                      }
                    >
                      {isOpen
                        ? "▲ Hide Subjects"
                        : "▼ View Subjects"}
                    </button>

                    <button
                      className="edit-btn"
                      onClick={() =>
                        handleEdit(index)
                      }
                    >
                      ✏️ Edit
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() =>
                        handleDelete(index)
                      }
                    >
                      🗑️ Delete
                    </button>

                  </div>

                  {isOpen && (
                    <div className="subjects">

                      {semester.subjects.length ===
                      0 ? (

                        <p className="no-subjects">
                          No subjects added.
                        </p>

                      ) : (

                        semester.subjects.map(
                          (subject, i) => (
                            <span
                              className="subject-chip"
                              key={i}
                            >
                              📘 {subject}
                            </span>
                          )
                        )

                      )}

                    </div>
                  )}

                </div>
              );
            }
          )

        )}

      </div>

    </div>
  );
}

export default SemesterPage;