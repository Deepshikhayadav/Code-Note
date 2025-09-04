package com.deepshikhayadav.code_note.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.deepshikhayadav.code_note.model.CodeNote;
import com.deepshikhayadav.code_note.repository.CodeNoteRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class CodeNoteService {
    
    private final CodeNoteRepository codeNoteRepository;
    
    @Autowired
    public CodeNoteService(CodeNoteRepository codeNoteRepository) {
        this.codeNoteRepository = codeNoteRepository;
    }
    
    public List<CodeNote> getAllNotes() {
        return codeNoteRepository.findAllByOrderByCreatedAtDesc();
    }
    
    public Optional<CodeNote> getNoteById(String id) {
        return codeNoteRepository.findById(id);
    }
    
    public CodeNote createNote(CodeNote codeNote) {
        codeNote.setCreatedAt(LocalDateTime.now());
        codeNote.setUpdatedAt(LocalDateTime.now());
        return codeNoteRepository.save(codeNote);
    }
    
    public CodeNote updateNote(String id, CodeNote codeNoteDetails) {
        return codeNoteRepository.findById(id)
                .map(existingNote -> {
                    existingNote.setTitle(codeNoteDetails.getTitle());
                    existingNote.setCode(codeNoteDetails.getCode());
                    existingNote.setNotes(codeNoteDetails.getNotes());
                    existingNote.setLanguage(codeNoteDetails.getLanguage());
                    existingNote.setOutput(codeNoteDetails.getOutput());
                    existingNote.setUpdatedAt(LocalDateTime.now());
                    return codeNoteRepository.save(existingNote);
                })
                .orElseGet(() -> {
                    codeNoteDetails.setId(id);
                    return codeNoteRepository.save(codeNoteDetails);
                });
    }
    
    public void deleteNote(String id) {
        codeNoteRepository.deleteById(id);
    }
    
    public List<CodeNote> getNotesByLanguage(String language) {
        return codeNoteRepository.findByLanguageOrderByCreatedAtDesc(language);
    }
    
    public List<CodeNote> searchNotesByTitle(String title) {
        return codeNoteRepository.findByTitleContainingIgnoreCaseOrderByCreatedAtDesc(title);
    }
}