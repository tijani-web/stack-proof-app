import React, { useRef } from 'react';
import { FaUpload } from 'react-icons/fa';

const UploadCard = ({ onUpload }) => {
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target.result;
      onUpload(content); // Pass content to parent
    };

    if (file.type === 'application/pdf') {
      alert("PDFs need extra support — for now, upload a .txt or .js file");
      return;
    }

    reader.readAsText(file);
  };

  return (
    <div
      className="upload-card glass"
      onClick={() => fileInputRef.current.click()}
      style={{
        cursor: 'pointer',
        padding: '2rem',
        border: '2px dashed #ccc',
        textAlign: 'center',
        borderRadius: '12px',
        transition: 'all 0.3s ease',
        backgroundColor: 'rgba(255, 255, 255, 0.04)',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
      }}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".txt,.js,.py,.java,.c,.cpp"
        style={{ display: 'none' }}
      />
      <FaUpload size={40} style={{ marginBottom: '1rem', color: '#888' }} />
      <p style={{ fontSize: '1.1rem', color: '#ddd' }}>
        Click here to upload your resume or code file
      </p>
      <p style={{ fontSize: '0.85rem', color: '#888' }}>(Supported: .txt, .js, .py, .c, .cpp)</p>
    </div>
  );
};

export default UploadCard;
