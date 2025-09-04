// src/components/Sidebar.js
import React from 'react';
import '../styles/Sidebar.css';

const Sidebar = ({ notes, activeNote, onNoteSelect, onNewNote }) => {
  return (
    <div className="sidebar">
      <h3>Your Code Notes</h3>
      <div className="notes-list">
        {notes.length === 0 ? (
          <div className="empty-state">
            <i className="fas fa-sticky-note"></i>
            <p>No notes yet</p>
          </div>
        ) : (
          notes.map(note => (
            <div 
              key={note.id} 
              className={`note-item ${activeNote && activeNote.id === note.id ? 'active' : ''}`}
              onClick={() => onNoteSelect(note)}
            >
              <div className="note-title">{note.title}</div>
              <div className="note-preview">{note.language.toUpperCase()}: {note.code.substring(0, 50)}...</div>
            </div>
          ))
        )}
      </div>
      <button className="new-note-btn" onClick={onNewNote}>
        <i className="fas fa-plus"></i>
        New Note
      </button>
    </div>
  );
};

export default Sidebar;