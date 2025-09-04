// src/components/Editor.js
import React from 'react';
import Output from './Output';
import '../styles/Editor.css';

const Editor = ({ 
  activeNote, 
  title, 
  setTitle, 
  language, 
  setLanguage, 
  code, 
  setCode, 
  noteText, 
  setNoteText, 
  output, 
  onSaveNote, 
  onRunCode, 
  onDeleteNote 
}) => {
  if (!activeNote) {
    return (
      <div className="editor-container">
        <div className="empty-state">
          <i className="fas fa-code"></i>
          <h3>No Note Selected</h3>
          <p>Select a note from the sidebar or create a new one to start coding.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="editor-container">
      <div className="editor-toolbar">
        <input 
          type="text" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Note title"
          className="title-input"
        />
        <div className="action-buttons">
          <select 
            className="language-select" 
            value={language} 
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
            <option value="cpp">C++</option>
            <option value="html">HTML</option>
            <option value="css">CSS</option>
          </select>
          <button className="toolbar-btn save-btn" onClick={onSaveNote}>
            <i className="fas fa-save"></i>
            Save
          </button>
          <button className="toolbar-btn run-btn" onClick={onRunCode}>
            <i className="fas fa-play"></i>
            Run
          </button>
          <button className="toolbar-btn delete-btn" onClick={onDeleteNote}>
            <i className="fas fa-trash"></i>
            Delete
          </button>
        </div>
      </div>
      
      <div className="editor-content">
        <div className="code-editor">
          <textarea 
            value={code} 
            onChange={(e) => setCode(e.target.value)}
            className="code-textarea"
            spellCheck="false"
          />
        </div>
        
        <div className="notes-section">
          <textarea 
            className="notes-textarea"
            value={noteText} 
            onChange={(e) => setNoteText(e.target.value)}
            placeholder="Add your notes about the code here..."
          />
        </div>
      </div>
      
      <Output output={output} />
    </div>
  );
};

export default Editor;