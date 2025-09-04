package com.deepshikhayadav.code_note.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.deepshikhayadav.code_note.model.CodeNote;
import com.deepshikhayadav.code_note.repository.CodeNoteRepository;

@Component
public class DataInitializer implements CommandLineRunner {
    
    @Autowired
    private CodeNoteRepository codeNoteRepository;
    
    @Override
    public void run(String... args) throws Exception {
        // Clear existing data
        codeNoteRepository.deleteAll();
        
        // Add sample data
        CodeNote note1 = new CodeNote();
        note1.setTitle("Fibonacci Function");
        note1.setLanguage("python");
        note1.setCode("def fibonacci(n):\n    if n <= 1:\n        return n\n    else:\n        return fibonacci(n-1) + fibonacci(n-2)\n\n# Print first 10 Fibonacci numbers\nfor i in range(10):\n    print(fibonacci(i))");
        note1.setNotes("This is a recursive implementation of Fibonacci sequence. Time complexity is O(2^n).");
        note1.setOutput("0\n1\n1\n2\n3\n5\n8\n13\n21\n34");
        
        CodeNote note2 = new CodeNote();
        note2.setTitle("Quick Sort Example");
        note2.setLanguage("javascript");
        note2.setCode("function quickSort(arr) {\n  if (arr.length <= 1) return arr;\n  \n  const pivot = arr[0];\n  const left = [];\n  const right = [];\n  \n  for (let i = 1; i < arr.length; i++) {\n    if (arr[i] < pivot) {\n      left.push(arr[i]);\n    } else {\n      right.push(arr[i]);\n    }\n  }\n  \n  return [...quickSort(left), pivot, ...quickSort(right)];\n}\n\nconst sorted = quickSort([5, 2, 9, 1, 7, 3]);\nconsole.log(\"Sorted array:\", sorted);");
        note2.setNotes("QuickSort is a divide and conquer algorithm. It works by selecting a pivot element and partitioning the array around the pivot.");
        note2.setOutput("Sorted array: [1, 2, 3, 5, 7, 9]");
        
        codeNoteRepository.save(note1);
        codeNoteRepository.save(note2);
        
        System.out.println("Sample data initialized");
    }
}