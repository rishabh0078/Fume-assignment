import React, { useState } from 'react';

const ConversationInput = ({ onAnalyze, isLoading }) => {
  const [text, setText] = useState('');
  const [isParsingFile, setIsParsingFile] = useState(false);

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsParsingFile(true);

    try {
      if (file.type === 'application/pdf' || file.name.endsWith('.pdf')) {
        const arrayBuffer = await file.arrayBuffer();
        if (window.pdfjsLib) {
          const pdf = await window.pdfjsLib.getDocument({ data: new Uint8Array(arrayBuffer) }).promise;
          let fullText = '';
          for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const textContent = await page.getTextContent();
            const pageText = textContent.items.map(item => item.str).join(' ');
            fullText += pageText + '\n\n';
          }
          setText(fullText);
        } else {
          alert('PDF engine is initializing. Please try again in a moment.');
        }
      } else {
        const reader = new FileReader();
        reader.onload = (event) => {
          if (event.target?.result) {
            setText(event.target.result);
          }
        };
        reader.readAsText(file);
      }
    } catch (err) {
      console.error('File parsing error:', err);
      alert('Failed to read file. Please ensure it is a valid text or PDF document.');
    } finally {
      setIsParsingFile(false);
    }
  };

  const handleAnalyze = () => {
    if (text.trim()) {
      onAnalyze(text);
    }
  };

  return (
    <div className="conversation-input-container">
      <h2>Conversation Input</h2>
      <p className="text-muted conversation-input-description">
        Paste the coach-client transcript or upload a .txt or .pdf file for analysis.
      </p>

      <div className="file-upload-wrapper">
        <input 
          type="file" 
          id="file-upload" 
          accept=".txt,.pdf" 
          className="file-upload-input"
          onChange={handleFileUpload}
        />
        <label htmlFor="file-upload" className="file-upload-label">
          {isParsingFile ? 'Reading file...' : '+ Upload .txt or .pdf file'}
        </label>
      </div>

      <div className="form-group conversation-input-form">
        <textarea 
          placeholder="Paste conversation transcript here or upload a .txt/.pdf file..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="conversation-input-textarea"
        />
      </div>

      <button 
        className="btn-primary conversation-input-btn" 
        onClick={handleAnalyze}
        disabled={!text.trim() || isLoading || isParsingFile}
      >
        {isLoading ? 'Analyzing...' : 'Analyze Conversation'}
      </button>
    </div>
  );
};

export default ConversationInput;
