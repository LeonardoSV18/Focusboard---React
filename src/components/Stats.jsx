export default function Stats({ tasks }) {
  const total = tasks.length;
  const done = tasks.filter((t) => t.done).length;
  const percent = total === 0 ? 0 : Math.round((done / total) * 100);

  return (
    <section className="stats" aria-label="Progress">
      <p>
        <strong>{done}</strong> of <strong>{total}</strong> tasks completed
      </p>
      <div
        className="progress"
        role="progressbar"
        aria-valuenow={percent}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Completion progress"
      >
        <div className="progress__bar" style={{ width: `${percent}%` }} />
      </div>
    </section>
  );
}
