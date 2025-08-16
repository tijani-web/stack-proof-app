import { Editor } from '@monaco-editor/react';
import axios from 'axios';
import React, { useState } from 'react';
import { FaCode } from 'react-icons/fa';

const QuestEditor = ({
  starterCode,
  defaultLanguage,
  judgeLanguageId,
  expectedOutput,
  onSubmitComplete
}) => {
  const [code, setCode] = useState(starterCode);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);

    try {
      const res = await axios.post(
        'https://judge0-ce.p.rapidapi.com/submissions',
        {
          source_code: code,
          language_id: judgeLanguageId || 63,
          stdin: '',
        },
        {
          headers: {
            'content-type': 'application/json',
            'X-RapidAPI-Key': import.meta.env.VITE_JUDGE0_API_KEY,
            'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
          },
          params: {
            base64_encoded: 'false',
            wait: 'true',
          },
        }
      );

      const { stdout, stderr, compile_output, message, status } = res.data;

      const isError = !!(stderr || compile_output || message);
      const finalOutput =
        stdout?.trim() ||
        stderr?.trim() ||
        compile_output?.trim() ||
        message?.trim() ||
        'No output';

      const passed = !isError && finalOutput.trim() === expectedOutput.trim();

      if (onSubmitComplete) {
        onSubmitComplete(finalOutput, passed, isError, status);
      }

    } catch (error) {
      console.error(' Execution failed:', error?.response?.data || error.message);
      if (onSubmitComplete) {
        onSubmitComplete('Execution failed.', false, true, null);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="quest-editor-container">
      <Editor
        height="400px"
        defaultLanguage={defaultLanguage}
        value={code}
        onChange={(value) => setCode(value || '')}
        theme="vs-dark"
        options={{
          fontSize: 16,
          minimap: { enabled: false },
          automaticLayout: true,
        }}
        className="quest-editor"
      />
      <div className="submit-btn" style={{ padding: '15px 0px' }}>
        <button
          className="submit-code btn-primary"
          onClick={handleSubmit}
          disabled={isLoading}
        >
          {isLoading ? 'Submitting...' : 'Submit Solution'} <FaCode className="icon" />
        </button>
      </div>
    </div>
  );
};

export default QuestEditor;
