package com.deepshikhayadav.code_note.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.deepshikhayadav.code_note.model.CodeNote;
import com.deepshikhayadav.code_note.service.CodeExecutionService;
import com.deepshikhayadav.code_note.service.CodeNoteService;

import jakarta.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/notes")
@CrossOrigin(origins = "http://localhost:3000")
public class CodeNoteController {
    
    private final CodeNoteService codeNoteService;
    private final CodeExecutionService codeExecutionService;
    
    @Autowired
    public CodeNoteController(CodeNoteService codeNoteService, 
                             CodeExecutionService codeExecutionService) {
        this.codeNoteService = codeNoteService;
        this.codeExecutionService = codeExecutionService;
    }
    
    @GetMapping
    public ResponseEntity<List<CodeNote>> getAllNotes() {
        List<CodeNote> notes = codeNoteService.getAllNotes();
        return new ResponseEntity<>(notes, HttpStatus.OK);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<CodeNote> getNoteById(@PathVariable String id) {
        Optional<CodeNote> note = codeNoteService.getNoteById(id);
        return note.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
    
    @PostMapping
    public ResponseEntity<CodeNote> createNote(@Valid @RequestBody CodeNote codeNote) {
        CodeNote createdNote = codeNoteService.createNote(codeNote);
        return new ResponseEntity<>(createdNote, HttpStatus.CREATED);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<CodeNote> updateNote(@PathVariable String id, 
                                              @Valid @RequestBody CodeNote codeNote) {
        CodeNote updatedNote = codeNoteService.updateNote(id, codeNote);
        return new ResponseEntity<>(updatedNote, HttpStatus.OK);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteNote(@PathVariable String id) {
        codeNoteService.deleteNote(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
    
    @GetMapping("/language/{language}")
    public ResponseEntity<List<CodeNote>> getNotesByLanguage(@PathVariable String language) {
        List<CodeNote> notes = codeNoteService.getNotesByLanguage(language);
        return new ResponseEntity<>(notes, HttpStatus.OK);
    }
    
    @GetMapping("/search")
    public ResponseEntity<List<CodeNote>> searchNotesByTitle(@RequestParam String title) {
        List<CodeNote> notes = codeNoteService.searchNotesByTitle(title);
        return new ResponseEntity<>(notes, HttpStatus.OK);
    }
    
    @PostMapping("/execute")
    public ResponseEntity<String> executeCode(@RequestParam String code, 
                                             @RequestParam String language) {
        String output = codeExecutionService.executeCode(code, language);
        return new ResponseEntity<>(output, HttpStatus.OK);
    }
    
    @PostMapping("/{id}/execute")
    public ResponseEntity<CodeNote> executeNoteCode(@PathVariable String id) {
        Optional<CodeNote> noteOptional = codeNoteService.getNoteById(id);
        
        if (noteOptional.isPresent()) {
            CodeNote note = noteOptional.get();
            String output = codeExecutionService.executeCode(note.getCode(), note.getLanguage());
            note.setOutput(output);
            
            CodeNote updatedNote = codeNoteService.updateNote(id, note);
            return new ResponseEntity<>(updatedNote, HttpStatus.OK);
        }
        
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}