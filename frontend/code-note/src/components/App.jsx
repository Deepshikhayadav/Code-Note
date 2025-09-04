// src/components/App.js
import React, { useState, useEffect } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import Editor from './Editor';
import { mockNotes } from '../utils/constants';
import '../styles/App.css';

const App = () => {
  const [notes, setNotes] = useState(mockNotes);
  const [activeNote, setActiveNote] = useState(null);
  const [language, setLanguage] = useState('javascript');
  const [code, setCode] = useState('');
  const [noteText, setNoteText] = useState('');
  const [output, setOutput] = useState('');
  const [title, setTitle] = useState('');

  // Initialize editor with first note
  useEffect(() => {
    if (notes.length > 0 && !activeNote) {
      handleNoteSelect(notes[0]);
    }
  }, [notes, activeNote]);

  const handleNoteSelect = (note) => {
    setActiveNote(note);
    setLanguage(note.language);
    setCode(note.code);
    setNoteText(note.notes);
    setOutput(note.output);
    setTitle(note.title);
  };

  const handleNewNote = () => {
    const newNote = {
      id: Date.now().toString(),
      title: 'New Code Note',
      language: 'javascript',
      code: '// Write your code here\nconsole.log("Hello, World!");',
      notes: 'Add your notes here...',
      output: 'Output will be shown here'
    };
    
    setNotes([newNote, ...notes]);
    handleNoteSelect(newNote);
  };

  const handleSaveNote = () => {
    if (!activeNote) return;
    
    const updatedNotes = notes.map(note => 
      note.id === activeNote.id 
        ? {...note, title, language, code, notes: noteText, output}
        : note
    );
    
    setNotes(updatedNotes);
    alert('Note saved successfully!');
  };

  const handleDeleteNote = () => {
    if (!activeNote) return;
    
    if (window.confirm('Are you sure you want to delete this note?')) {
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
    }
  };

  const handleRunCode = () => {
    // Simulate code execution
    setOutput('Running code...');
    
    setTimeout(() => {
      if (activeNote && activeNote.output) {
        setOutput(activeNote.output);
      } else {
        setOutput('Code executed successfully!\nNote: This is a simulation. In a real application, your code would be executed on the server.');
      }
    }, 1000);
  };

  return (
    <div className="app-container">
      <Header />
      
      <div className="app-content">
        <Sidebar 
          notes={notes}
          activeNote={activeNote}
          onNoteSelect={handleNoteSelect}
          onNewNote={handleNewNote}
        />
        
        <Editor 
          activeNote={activeNote}
          title={title}
          setTitle={setTitle}
          language={language}
          setLanguage={setLanguage}
          code={code}
          setCode={setCode}
          noteText={noteText}
          setNoteText={setNoteText}
          output={output}
          onSaveNote={handleSaveNote}
          onRunCode={handleRunCode}
          onDeleteNote={handleDeleteNote}
        />
      </div>
    </div>
  );
};

export default App;