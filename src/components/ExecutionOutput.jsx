import React from 'react';

const ExecutionOutput = ({ output, error, status }) => {
  return (
    <div className="live-preview glass">
      <h3>Live Output</h3>
      <p><strong>Status:</strong> {status?.description || 'Waiting...'}</p>

      <div className={`output-container ${output ? 'animate-output' : ''} ${error ? 'error' : 'success'}`}>
        <pre>
          {output || (error ? 'Something went wrong.' : 'Click "Run Code" to see output')}
        </pre>
      </div>
    </div>
  );
};

export default ExecutionOutput;
