import React from 'react';

const Editor = ({ 
    title, setTitle, 
    language, setLanguage, 
    code, setCode, 
    noteText, setNoteText, 
    updateNote, executeCode, deleteNote 
}) => {
    return (
        <>
            <div className="editor-toolbar">
                <input 
                    type="text" 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Note title"
                    style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid #ddd', width: '300px' }}
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
                    <button className="toolbar-btn save-btn" onClick={updateNote}>
                        <i className="fas fa-save"></i>
                        Save
                    </button>
                    <button className="toolbar-btn run-btn" onClick={executeCode}>
                        <i className="fas fa-play"></i>
                        Run
                    </button>
                    <button className="toolbar-btn delete-btn" onClick={deleteNote}>
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
                        style={{ width: '100%', height: '100%', padding: '15px', fontFamily: 'Monaco, Menlo, Ubuntu Mono, monospace', fontSize: '14px', border: 'none', resize: 'none' }}
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
        </>
    );
};

export default Editor;