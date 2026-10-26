import { useEffect, useMemo, useState } from "react";
import { useLocalStorage } from "./hooks/useLocalStorage.js";
import TaskForm from "./components/TaskForm.jsx";
import TaskItem from "./components/TaskItem.jsx";
import FilterBar from "./components/FilterBar.jsx";
import Stats from "./components/Stats.jsx";

const STARTER_TASKS = [
  { id: 1, text: "Push my portfolio project to GitHub", priority: "high", done: false },
  { id: 2, text: "Review React hooks", priority: "medium", done: false },
  { id: 3, text: "Style the app with CSS Grid", priority: "low", done: true },
];

export default function App() {
  const [tasks, setTasks] = useLocalStorage("focusboard-tasks", STARTER_TASKS);
  const [theme, setTheme] = useLocalStorage("focusboard-theme", "light");
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  // Apply the theme to <html> so CSS variables can switch.
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  function addTask(text, priority) {
    const newTask = { id: Date.now(), text, priority, done: false };
    setTasks((prev) => [newTask, ...prev]);
  }

  function toggleTask(id) {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  }

  function editTask(id, text) {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, text } : t)));
  }

  function deleteTask(id) {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }

  function clearCompleted() {
    setTasks((prev) => prev.filter((t) => !t.done));
  }

  // Derived data: recomputed only when its inputs change.
  const visibleTasks = useMemo(() => {
    const query = search.trim().toLowerCase();
    return tasks.filter((t) => {
      const matchesFilter =
        filter === "all" || (filter === "done" ? t.done : !t.done);
      const matchesSearch = t.text.toLowerCase().includes(query);
      return matchesFilter && matchesSearch;
    });
  }, [tasks, filter, search]);

  const hasCompleted = tasks.some((t) => t.done);

  return (
    <div className="app">
      <header className="app__header">
        <h1>FocusBoard</h1>
        <button
          type="button"
          className="btn btn--ghost"
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
        >
          {theme === "light" ? "Dark mode" : "Light mode"}
        </button>
      </header>

      <main className="card">
        <TaskForm onAdd={addTask} />
        <Stats tasks={tasks} />
        <FilterBar
          filter={filter}
          onFilterChange={setFilter}
          search={search}
          onSearchChange={setSearch}
        />

        {visibleTasks.length === 0 ? (
          <p className="empty">No tasks to show. Add one above!</p>
        ) : (
          <ul className="task-list">
            {visibleTasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onToggle={toggleTask}
                onDelete={deleteTask}
                onEdit={editTask}
              />
            ))}
          </ul>
        )}

        {hasCompleted && (
          <button type="button" className="btn btn--ghost clear" onClick={clearCompleted}>
            Clear completed
          </button>
        )}
      </main>

      <footer className="app__footer">
        Built with React, JavaScript, HTML5 &amp; CSS3
      </footer>
    </div>
  );
}
