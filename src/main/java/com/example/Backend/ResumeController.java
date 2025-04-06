package com.example.Backend;

import org.apache.tika.Tika;
import org.apache.tika.exception.TikaException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;

@RestController
@RequestMapping("/resume")
@CrossOrigin(origins = "http://localhost:5173")
public class ResumeController {

    private final Tika tika = new Tika();
    private final Set<String> ALLOWED_TYPES = Set.of(
            "application/pdf",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    );

    // ✅ Upload Endpoint
    @PostMapping("/upload")
    public ResponseEntity<String> uploadResume(@RequestParam("file") MultipartFile file) {
        try {
            String fileType = tika.detect(file.getInputStream());
            if (!ALLOWED_TYPES.contains(fileType)) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body("Invalid file type. Only PDF and DOCX are allowed.");
            }

            String resumeText = tika.parseToString(file.getInputStream());

            System.out.println("✅ Extracted text length: " + resumeText.length());
            System.out.println("🔍 Snippet: " + resumeText.substring(0, Math.min(300, resumeText.length())));

            return ResponseEntity.ok(resumeText); // ✅ Send to frontend for analysis
        } catch (IOException | TikaException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error processing file: " + e.getMessage());
        }
    }

    // ✅ Analyze Endpoint
    @PostMapping("/analyze")
    public ResponseEntity<Map<String, Object>> analyzeResume(@RequestBody String resumeText) {
        Map<String, Object> response = new HashMap<>();

        // Dummy ATS Score logic
        int atsScore = Math.min(100, resumeText.length() / 10);

        // Suggestions
        List<String> suggestions = new ArrayList<>();
        if (!resumeText.toLowerCase().contains("project")) {
            suggestions.add("Include a Projects section to showcase your work.");
        }
        if (!resumeText.toLowerCase().contains("skills")) {
            suggestions.add("Add a Skills section with your technical proficiencies.");
        }
        suggestions.add("Quantify achievements with metrics where possible.");

        // Strengths
        List<String> strengths = new ArrayList<>();
        if (resumeText.toLowerCase().contains("java") || resumeText.toLowerCase().contains("react")) {
            strengths.add("Includes relevant technical skills like Java/React.");
        }
        if (resumeText.toLowerCase().contains("team") || resumeText.toLowerCase().contains("collaborate")) {
            strengths.add("Mentions teamwork and collaboration.");
        }

        // Weaknesses
        List<String> weaknesses = new ArrayList<>();
        if (!resumeText.toLowerCase().contains("github") && !resumeText.toLowerCase().contains("portfolio")) {
            weaknesses.add("Missing GitHub/portfolio links to showcase your work.");
        }
        if (!resumeText.toLowerCase().contains("metrics") && !resumeText.toLowerCase().contains("%")) {
            weaknesses.add("Does not quantify achievements with metrics.");
        }

        // ✅ Matched Keywords
        List<String> matchedKeywords = new ArrayList<>();
        String[] keywords = {"java", "react", "spring", "github", "docker", "sql", "team", "project"};
        for (String keyword : keywords) {
            if (resumeText.toLowerCase().contains(keyword)) {
                matchedKeywords.add(keyword);
            }
        }

        // Build response
        response.put("atsScore", atsScore);
        response.put("suggestions", suggestions);
        response.put("strengths", strengths);
        response.put("weaknesses", weaknesses);
        response.put("matchedKeywords", matchedKeywords); // ✅ Optional, for frontend

        return ResponseEntity.ok(response);
    }

    // ✅ Test Endpoint
    @GetMapping("/test")
    public ResponseEntity<String> test() {
        return ResponseEntity.ok("Backend is running!");
    }
}
