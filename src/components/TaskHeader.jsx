import React from 'react';

const TaskHeader = () => {
  return (
    <div className="task-header glass fade-in">
      <h1>🧠 Task: Add Two Numbers</h1>
      <p>
        Write a JavaScript function called <code>add</code> that takes two numbers and returns their sum.
      </p>
      <p className="hint">
        <strong>Hint:</strong> You can use the <code>+</code> operator to add two numbers.
      </p>
      <p className="code">
        <strong>Cheat Code:</strong> <code>function add(a, b) {'{'} return a + b; {'}'}</code>
      </p>
    </div>
  );
};

export default TaskHeader;
