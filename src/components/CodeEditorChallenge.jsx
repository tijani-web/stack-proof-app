import { Editor } from "@monaco-editor/react";
import { FaCode } from "react-icons/fa";

const CodeEditorChallenge = ({ code, setCode, onSubmit, onRun, task }) => {
  return (
    <div className="editor glass">
      <div className="challenge-meta">
        <h3>{task?.taskTitle || "Untitled Challenge"}</h3>
        <p>{task?.taskDescription || "Your challenge description will appear here."}</p>
      </div>
      <div className="editor-con">
        <Editor
        height="100%"
        defaultLanguage={task?.monacoLanguage || "javascript"}
        value={code}
        onChange={(value) => setCode(value || '')}
        theme="vs-dark"
        options={{
        fontSize: 14,
        minimap: { enabled: false },
        automaticLayout: true,
        }}
      />
      </div>
      <div className="button-row">
        <button className="submit-code btn-primary" onClick={onSubmit}>
          Submit Code <FaCode className="icon" />
        </button>
        <button className="run-code btn-primary" onClick={onRun}>Run Code</button>
      </div>
    </div>
  );
};

export default CodeEditorChallenge;
