const FILTERS = [
  { id: "all", label: "All" },
  { id: "active", label: "Active" },
  { id: "done", label: "Done" },
];

export default function FilterBar({ filter, onFilterChange, search, onSearchChange }) {
  return (
    <div className="filter-bar">
      <div className="filter-bar__buttons" role="group" aria-label="Filter tasks">
        {FILTERS.map(({ id, label }) => (
          <button
            key={id}
            type="button"
            className={`chip ${filter === id ? "chip--active" : ""}`}
            aria-pressed={filter === id}
            onClick={() => onFilterChange(id)}
          >
            {label}
          </button>
        ))}
      </div>

      <label htmlFor="search" className="visually-hidden">
        Search tasks
      </label>
      <input
        id="search"
        type="search"
        placeholder="Search..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </div>
  );
}
