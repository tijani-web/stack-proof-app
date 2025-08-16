import React from 'react';

export default function TaskDetails({ task }) {
  if (!task) return null;         // guard if no task loaded yet

  return (
    <section className="task-details glass fade-in">
      <h2 className="task-main-title"><span className='task-label'>Task Title:</span>  {task.title}</h2>

      <p className="task-description"><span className='task-label'>Description:</span>  {task.description}</p>

      {/*  Sample I/O  */}
      <div className="io-block">
        <h4>📤 Expected Output</h4>
        <pre className="code hint" style={{
          fontSize: '1.1rem',
          fontWeight: 'bold'
        }}>{task.expectedOutput}</pre>
      </div>

      {/* Constraints (optional) */}
      {task.constraints?.length > 0 && (
        <div className="constraints">
          <h4>📌 Constraints</h4>
          <ul>
            {task.constraints.map((c, idx) => (
              <li key={idx}>{c}</li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
