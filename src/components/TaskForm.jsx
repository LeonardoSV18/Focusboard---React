import { useState } from "react";

export default function TaskForm({ onAdd }) {
  const [text, setText] = useState("");
  const [priority, setPriority] = useState("medium");
  const [error, setError] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    const trimmed = text.trim();

    if (!trimmed) {
      setError("Please write a task first.");
      return;
    }

    onAdd(trimmed, priority);
    setText("");
    setError("");
  }

  return (
    <form className="task-form" onSubmit={handleSubmit} noValidate>
      <div className="task-form__row">
        <label htmlFor="task-text" className="visually-hidden">
          New task
        </label>
        <input
          id="task-text"
          type="text"
          placeholder="What do you need to do?"
          value={text}
          maxLength={120}
          onChange={(e) => setText(e.target.value)}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? "task-error" : undefined}
        />

        <label htmlFor="task-priority" className="visually-hidden">
          Priority
        </label>
        <select
          id="task-priority"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <button type="submit" className="btn btn--primary">
          Add
        </button>
      </div>
      {error && (
        <p id="task-error" className="form-error" role="alert">
          {error}
        </p>
      )}
    </form>
  );
}
