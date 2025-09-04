package com.deepshikhayadav.code_note.repository;


import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.deepshikhayadav.code_note.model.CodeNote;

import java.util.List;

@Repository
public interface CodeNoteRepository extends MongoRepository<CodeNote, String> {
    
    List<CodeNote> findAllByOrderByCreatedAtDesc();
    
    List<CodeNote> findByLanguageOrderByCreatedAtDesc(String language);
    
    List<CodeNote> findByTitleContainingIgnoreCaseOrderByCreatedAtDesc(String title);
}