import React from 'react';

const Sidebar = ({ notes, loading, activeNote, handleNoteSelect, createNote }) => {
    return (
        <div className="sidebar">
            <h3>Your Code Notes</h3>
            <div className="notes-list">
                {loading ? (
                    <div className="empty-state">
                        <i className="fas fa-spinner fa-spin"></i>
                        <p>Loading notes...</p>
                    </div>
                ) : notes.length === 0 ? (
                    <div className="empty-state">
                        <i className="fas fa-sticky-note"></i>
                        <p>No notes yet</p>
                    </div>
                ) : (
                    notes.map(note => (
                        <div 
                            key={note.id} 
                            className={`note-item ${activeNote && activeNote.id === note.id ? 'active' : ''}`}
                            onClick={() => handleNoteSelect(note)}
                        >
                            <div className="note-title">{note.title}</div>
                            <div className="note-preview">{note.language.toUpperCase()}: {note.code.substring(0, 50)}...</div>
                        </div>
                    ))
                )}
            </div>
            <button className="new-note-btn" onClick={createNote}>
                <i className="fas fa-plus"></i>
                New Note
            </button>
        </div>
    );
};

export default Sidebar;