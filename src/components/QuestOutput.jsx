import React, { useRef } from 'react';

const QuestOutput = React.forwardRef(({ output, error, status, isLoading }, ref) => {
  return (
    <div ref={ref} className={`quest-output glass fade-in ${error ? 'error' : ''}`}>
      <h3>💻 Output</h3>

      {/* LOADING STATE */}
      {isLoading && (
        <div className="output-loading">
          <p>⏳ Running your code... <span className="typing-dots">
            <span>.</span><span>.</span><span>.</span>
          </span></p>
        </div>
      )}

      {/* DEFAULT IDLE STATE */}
      {!isLoading && !output && !status && (
        <div className="output-placeholder">
          <p className="faded-text">Your output will appear here once you run your code.</p>
        </div>
      )}

      {/* AFTER SUBMISSION */}
      {!isLoading && output && (
        <>
          {status?.description && (
            <p className="status-msg">
              <strong>Status:</strong> {status.description}
            </p>
          )}

          <pre className="output-text" style={{ color: 'green' }}>{output}</pre>

          {!status?.description && (
            <p className="checking-msg">🧠 Checking your result...</p>
          )}
        </>
      )}
    </div>
  );
});

export default QuestOutput;
