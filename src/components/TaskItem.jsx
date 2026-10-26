import { useState } from "react";

export default function TaskItem({ task, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(task.text);

  function saveEdit() {
    const trimmed = draft.trim();
    if (trimmed) onEdit(task.id, trimmed);
    else setDraft(task.text);
    setIsEditing(false);
  }

  function handleKeyDown(event) {
    if (event.key === "Enter") saveEdit();
    if (event.key === "Escape") {
      setDraft(task.text);
      setIsEditing(false);
    }
  }

  return (
    <li className={`task ${task.done ? "task--done" : ""}`}>
      <input
        type="checkbox"
        checked={task.done}
        onChange={() => onToggle(task.id)}
        aria-label={`Mark "${task.text}" as ${task.done ? "not done" : "done"}`}
      />

      {isEditing ? (
        <input
          className="task__edit"
          value={draft}
          autoFocus
          maxLength={120}
          onChange={(e) => setDraft(e.target.value)}
          onBlur={saveEdit}
          onKeyDown={handleKeyDown}
          aria-label="Edit task text"
        />
      ) : (
        <span className="task__text">{task.text}</span>
      )}

      <span className={`badge badge--${task.priority}`}>{task.priority}</span>

      <div className="task__actions">
        <button
          type="button"
          className="btn btn--ghost"
          onClick={() => setIsEditing(true)}
          aria-label={`Edit "${task.text}"`}
        >
          Edit
        </button>
        <button
          type="button"
          className="btn btn--ghost btn--danger"
          onClick={() => onDelete(task.id)}
          aria-label={`Delete "${task.text}"`}
        >
          Delete
        </button>
      </div>
    </li>
  );
}
