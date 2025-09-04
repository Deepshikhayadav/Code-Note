package com.deepshikhayadav.code_note.service;


import org.springframework.stereotype.Service;
import java.io.*;
import java.util.concurrent.TimeUnit;

@Service
public class CodeExecutionService {
    
    public String executeCode(String code, String language) {
        switch (language.toLowerCase()) {
            case "javascript":
                return executeJavaScript(code);
            case "python":
                return executePython(code);
            case "java":
                return executeJava(code);
            default:
                return "Unsupported language: " + language;
        }
    }
    
    private String executeJavaScript(String code) {
        try {
            // Create a temporary JS file
            File tempFile = File.createTempFile("code", ".js");
            try (FileWriter writer = new FileWriter(tempFile)) {
                writer.write(code);
            }
            
            // Execute the code using Node.js
            Process process = Runtime.getRuntime().exec("node " + tempFile.getAbsolutePath());
            
            // Wait for the process to complete with a timeout
            boolean finished = process.waitFor(10, TimeUnit.SECONDS);
            
            if (!finished) {
                process.destroy();
                return "Execution timed out after 10 seconds";
            }
            
            // Read the output
            BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
            BufferedReader errorReader = new BufferedReader(new InputStreamReader(process.getErrorStream()));
            
            StringBuilder output = new StringBuilder();
            String line;
            while ((line = reader.readLine()) != null) {
                output.append(line).append("\n");
            }
            
            // Read errors if any
            if (output.length() == 0) {
                while ((line = errorReader.readLine()) != null) {
                    output.append(line).append("\n");
                }
            }
            
            // Clean up
            tempFile.delete();
            
            return output.toString().trim();
            
        } catch (IOException | InterruptedException e) {
            return "Error executing JavaScript: " + e.getMessage();
        }
    }
    
    private String executePython(String code) {
        try {
            // Create a temporary Python file
            File tempFile = File.createTempFile("code", ".py");
            try (FileWriter writer = new FileWriter(tempFile)) {
                writer.write(code);
            }
            
            // Execute the code using Python
            Process process = Runtime.getRuntime().exec("python " + tempFile.getAbsolutePath());
            
            // Wait for the process to complete with a timeout
            boolean finished = process.waitFor(10, TimeUnit.SECONDS);
            
            if (!finished) {
                process.destroy();
                return "Execution timed out after 10 seconds";
            }
            
            // Read the output
            BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
            BufferedReader errorReader = new BufferedReader(new InputStreamReader(process.getErrorStream()));
            
            StringBuilder output = new StringBuilder();
            String line;
            while ((line = reader.readLine()) != null) {
                output.append(line).append("\n");
            }
            
            // Read errors if any
            if (output.length() == 0) {
                while ((line = errorReader.readLine()) != null) {
                    output.append(line).append("\n");
                }
            }
            
            // Clean up
            tempFile.delete();
            
            return output.toString().trim();
            
        } catch (IOException | InterruptedException e) {
            return "Error executing Python: " + e.getMessage();
        }
    }
    
    private String executeJava(String code) {
        // For Java, we need a more complex approach
        // This is a simplified version that would need enhancement for production
        return "Java execution is not fully implemented in this example. " +
               "A production implementation would require compiling and running in a secure sandbox.";
    }
}