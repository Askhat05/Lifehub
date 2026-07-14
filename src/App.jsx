import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks")) || [],
  );

  const [notes, setNotes] = useState(
    JSON.parse(localStorage.getItem("notes")) || [],
  );

  const [note, setNote] = useState("");

  const [goal, setGoal] = useState("");
  const [darkMode, setDarkMode] = useState(
    JSON.parse(localStorage.getItem("darkMode")) || false,
  );
  const [goals, setGoals] = useState(
    JSON.parse(localStorage.getItem("goals")) || [],
  );

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    localStorage.setItem("goals", JSON.stringify(goals));
  }, [goals]);

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));

    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [darkMode]);

  function addTask() {
    if (task.trim() === "") return;

    setTasks([
      ...tasks,
      {
        text: task,
        completed: false,
      },
    ]);

    setTask("");
  }

  function addNote() {
    if (note.trim() === "") return;
    setNotes([...notes, note]);
    setNote("");
  }

  function addGoal() {
    if (goal.trim() === "") return;

    setGoals([
      ...goals,
      {
        text: goal,
        progress: 0,
      },
    ]);
    setGoal("");
  }

  return (
    <div className="container">
      <header className="navbar">
        <div className="logo">💙 LifeHub</div>

        <nav>
          <button
            onClick={() =>
              document.getElementById("tasks").scrollIntoView({
                behavior: "smooth",
              })
            }
          >
            Tasks
          </button>

          <button
            onClick={() =>
              document.getElementById("calendar").scrollIntoView({
                behavior: "smooth",
              })
            }
          >
            Calendar
          </button>

          <button
            onClick={() =>
              document.getElementById("notes").scrollIntoView({
                behavior: "smooth",
              })
            }
          >
            Notes
          </button>

          <button
            onClick={() =>
              document.getElementById("goals").scrollIntoView({
                behavior: "smooth",
              })
            }
          >
            Goals
          </button>
        </nav>
      </header>

      <div className="content">
        <div className="topbar">
          <div>
            <h1>Good Evening 👋</h1>
            <p>Stay productive and organize your life.</p>
          </div>

          <button className="theme-btn" onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? "☀️" : "🌙"}
          </button>
        </div>

        <div className="cards">
          <div className="card">
            <div className="card-icon">📋</div>

            <h2>{tasks.filter((t) => !t.completed).length}</h2>

            <p>Pending Tasks</p>
          </div>

          <div className="card">
            <div className="card-icon">🔥</div>

            <h2>
              {tasks.length
                ? Math.round(
                    (tasks.filter((t) => t.completed).length / tasks.length) *
                      100,
                  )
                : 0}
              %
            </h2>

            <p>Productivity</p>
          </div>

          <div className="card">
            <div className="card-icon">📝</div>

            <h2>{notes.length}</h2>

            <p>Notes</p>
          </div>

          <div className="card">
            <div className="card-icon">🎯</div>

            <h2>
              {goals.filter((g) => g.progress === 100).length}/{goals.length}
            </h2>

            <p>Completed Goals</p>
          </div>
        </div>
        <div className="dashboard-grid">
          <div className="left-column">
            {/* TASKS */}

            <div className="section-card tasks-card" id="tasks">
              <div className="section-header">
                <div>
                  <h2>Today's Tasks</h2>

                  <p>Focus on what matters today.</p>
                </div>
              </div>

              <div className="input-row">
                <input
                  type="text"
                  placeholder="New task..."
                  value={task}
                  onChange={(e) => setTask(e.target.value)}
                />

                <button onClick={addTask}>Add Task</button>
              </div>

              <ul className="tasks-list">
                {tasks.length === 0 && (
                  <p style={{ color: "#94a3b8" }}>
                    No tasks yet. Create your first task.
                  </p>
                )}
                {tasks.map((item, index) => (
                  <li key={index}>
                    <div className="task-left">
                      <input
                        type="checkbox"
                        checked={item.completed}
                        onChange={() => {
                          const newTasks = [...tasks];

                          newTasks[index].completed =
                            !newTasks[index].completed;

                          setTasks(newTasks);
                        }}
                      />

                      <span
                        style={{
                          textDecoration: item.completed
                            ? "line-through"
                            : "none",
                        }}
                      >
                        {item.text}
                      </span>
                    </div>

                    <button
                      onClick={() =>
                        setTasks(tasks.filter((_, i) => i !== index))
                      }
                    >
                      ❌
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="right-column">
            <div className="section-card">
              <h2>📊 Productivity</h2>

              <div style={{ marginTop: 25 }}>
                <h1>
                  {tasks.length
                    ? Math.round(
                        (tasks.filter((t) => t.completed).length /
                          tasks.length) *
                          100,
                      )
                    : 0}
                  %
                </h1>

                <div
                  style={{
                    width: "100%",
                    height: 12,
                    background: "#e5e7eb",
                    borderRadius: 20,
                    margin: "20px 0",
                  }}
                >
                  <div
                    style={{
                      width: `${
                        tasks.length
                          ? (tasks.filter((t) => t.completed).length /
                              tasks.length) *
                            100
                          : 0
                      }%`,
                      height: "100%",
                      background: "#2563eb",
                      borderRadius: 20,
                    }}
                  />
                </div>

                <p>✅ Completed: {tasks.filter((t) => t.completed).length}</p>

                <p>📋 Remaining: {tasks.filter((t) => !t.completed).length}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="dashboard-grid second-row">
          <div className="section-card" id="notes">
            <div className="section-header">
              <div>
                <h2>Quick Notes</h2>
                <p>Capture your ideas.</p>
              </div>
            </div>

            <div className="input-row">
              <input
                type="text"
                placeholder="Write note..."
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />

              <button onClick={addNote}>Add</button>
            </div>

            <ul>
              {notes.map((item, index) => (
                <li key={index}>
                  {item}

                  <button
                    onClick={() =>
                      setNotes(notes.filter((_, i) => i !== index))
                    }
                  >
                    ❌
                  </button>
                </li>
              ))}
            </ul>
            {notes.length === 0 && (
              <p style={{ color: "#94a3b8", marginTop: 15 }}>No notes yet.</p>
            )}
          </div>

          <div className="section-card" id="goals">
            <div className="section-header">
              <div>
                <h2>Goals</h2>
                <p>Keep moving forward.</p>
              </div>
            </div>

            <div className="input-row">
              <input
                type="text"
                placeholder="New goal..."
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
              />

              <button onClick={addGoal}>Add</button>
            </div>

            <ul>
              {goals.map((item, index) => (
                <li key={index}>
                  <div style={{ width: "100%" }}>
                    <strong>{item.text}</strong>

                    <div
                      style={{
                        width: "100%",
                        height: 10,
                        background: "#e5e7eb",
                        borderRadius: 10,
                        marginTop: 10,
                      }}
                    >
                      <div
                        style={{
                          width: `${item.progress}%`,
                          height: "100%",
                          background: "#2563eb",
                          borderRadius: 10,
                        }}
                      />
                    </div>

                    <p style={{ marginTop: 8 }}>{item.progress}%</p>

                    <button
                      style={{ marginTop: 10 }}
                      onClick={() => {
                        const newGoals = [...goals];

                        newGoals[index].progress = Math.min(
                          newGoals[index].progress + 10,
                          100,
                        );

                        setGoals(newGoals);
                      }}
                    >
                      +10%
                    </button>
                  </div>

                  <button
                    onClick={() =>
                      setGoals(goals.filter((_, i) => i !== index))
                    }
                  >
                    ❌
                  </button>
                </li>
              ))}
            </ul>
            {goals.length === 0 && (
              <p style={{ color: "#94a3b8", marginTop: 15 }}>No goals yet.</p>
            )}
          </div>
        </div>

        <hr />

        <p style={{ marginTop: 20, textAlign: "center", color: "#666" }}>
          LifeHub © 2026
        </p>
      </div>
    </div>
  );
}

export default App;
