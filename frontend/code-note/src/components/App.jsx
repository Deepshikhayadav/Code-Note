import React, { useState, useEffect } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import Editor from './Editor';
import Output from './Output';
import '../App.css';

const API_BASE_URL = 'http://localhost:8080/api';

const App = () => {
    const [notes, setNotes] = useState([]);
    const [activeNote, setActiveNote] = useState(null);
    const [language, setLanguage] = useState('javascript');
    const [code, setCode] = useState('');
    const [noteText, setNoteText] = useState('');
    const [output, setOutput] = useState('');
    const [title, setTitle] = useState('');
    const [loading, setLoading] = useState(true);
    const [notification, setNotification] = useState(null);

    // Show notification
    const showNotification = (message, isError = false) => {
        setNotification({ message, isError });
        setTimeout(() => setNotification(null), 3000);
    };

    // Fetch all notes from the backend
    const fetchNotes = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${API_BASE_URL}/notes`);
            if (!response.ok) {
                throw new Error('Failed to fetch notes');
            }
            const data = await response.json();
            setNotes(data);
            if (data.length > 0 && !activeNote) {
                handleNoteSelect(data[0]);
            }
        } catch (error) {
            console.error('Error fetching notes:', error);
            showNotification('Error fetching notes: ' + error.message, true);
        } finally {
            setLoading(false);
        }
    };

    // Create a new note
    const createNote = async () => {
        try {
            const newNote = {
                title: 'New Code Note',
                language: 'javascript',
                code: '// Write your code here\nconsole.log("Hello, World!");',
                notes: 'Add your notes here...',
                output: ''
            };
            
            const response = await fetch(`${API_BASE_URL}/notes`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newNote),
            });
            
            if (!response.ok) {
                throw new Error('Failed to create note');
            }
            
            const createdNote = await response.json();
            setNotes([createdNote, ...notes]);
            handleNoteSelect(createdNote);
            showNotification('Note created successfully!');
        } catch (error) {
            console.error('Error creating note:', error);
            showNotification('Error creating note: ' + error.message, true);
        }
    };

    // Update a note
    const updateNote = async () => {
        if (!activeNote) return;
        
        try {
            const updatedNote = {
                title,
                language,
                code,
                notes: noteText,
                output
            };
            
            const response = await fetch(`${API_BASE_URL}/notes/${activeNote.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedNote),
            });
            
            if (!response.ok) {
                throw new Error('Failed to update note');
            }
            
            const savedNote = await response.json();
            setNotes(notes.map(note => 
                note.id === activeNote.id ? savedNote : note
            ));
            setActiveNote(savedNote);
            showNotification('Note saved successfully!');
        } catch (error) {
            console.error('Error updating note:', error);
            showNotification('Error updating note: ' + error.message, true);
        }
    };

    // Delete a note
    const deleteNote = async () => {
        if (!activeNote) return;
        
        if (window.confirm('Are you sure you want to delete this note?')) {
            try {
                const response = await fetch(`${API_BASE_URL}/notes/${activeNote.id}`, {
                    method: 'DELETE',
                });
                
                if (!response.ok) {
                    throw new Error('Failed to delete note');
                }
                
                const updatedNotes = notes.filter(note => note.id !== activeNote.id);
                setNotes(updatedNotes);
                
                if (updatedNotes.length > 0) {
                    handleNoteSelect(updatedNotes[0]);
                } else {
                    setActiveNote(null);
                    setCode('');
                    setNoteText('');
                    setOutput('');
                    setTitle('');
                    setLanguage('javascript');
                }
                
                showNotification('Note deleted successfully!');
            } catch (error) {
                console.error('Error deleting note:', error);
                showNotification('Error deleting note: ' + error.message, true);
            }
        }
    };

    // Execute code
    const executeCode = async () => {
        try {
            setOutput('Running code...');
            
            // If we have an active note, execute that specific note
            if (activeNote) {
                const response = await fetch(`${API_BASE_URL}/notes/${activeNote.id}/execute`, {
                    method: 'POST',
                });
                
                if (!response.ok) {
                    throw new Error('Failed to execute code');
                }
                
                const result = await response.json();
                setOutput(result.output);
                setActiveNote(result);
            } else {
                // Execute arbitrary code
                const response = await fetch(`${API_BASE_URL}/notes/execute?code=${encodeURIComponent(code)}&language=${language}`, {
                    method: 'POST',
                });
                
                if (!response.ok) {
                    throw new Error('Failed to execute code');
                }
                
                const result = await response.text();
                setOutput(result);
            }
            
            showNotification('Code executed successfully!');
        } catch (error) {
            console.error('Error executing code:', error);
            setOutput('Error: ' + error.message);
            showNotification('Error executing code: ' + error.message, true);
        }
    };

    // Handle note selection
    const handleNoteSelect = (note) => {
        setActiveNote(note);
        setLanguage(note.language);
        setCode(note.code);
        setNoteText(note.notes);
        setOutput(note.output || '');
        setTitle(note.title);
    };

    // Load notes on component mount
    useEffect(() => {
        fetchNotes();
    }, []);

    return (
        <div className="app-container">
            <Header />
            
            <div className="app-content">
                <Sidebar 
                    notes={notes}
                    loading={loading}
                    activeNote={activeNote}
                    handleNoteSelect={handleNoteSelect}
                    createNote={createNote}
                />
                
                <div className="editor-container">
                    {activeNote ? (
                        <>
                            <Editor 
                                title={title}
                                setTitle={setTitle}
                                language={language}
                                setLanguage={setLanguage}
                                code={code}
                                setCode={setCode}
                                noteText={noteText}
                                setNoteText={setNoteText}
                                updateNote={updateNote}
                                executeCode={executeCode}
                                deleteNote={deleteNote}
                            />
                            
                            <Output output={output} />
                        </>
                    ) : (
                        <div className="empty-state">
                            <i className="fas fa-code"></i>
                            <h3>No Note Selected</h3>
                            <p>Select a note from the sidebar or create a new one to start coding.</p>
                        </div>
                    )}
                </div>
            </div>
            
            {notification && (
                <div className={`notification ${notification.isError ? 'error' : ''}`}>
                    <i className={`fas ${notification.isError ? 'fa-exclamation-circle' : 'fa-check-circle'}`}></i>
                    {notification.message}
                </div>
            )}
        </div>
    );
};

export default App;