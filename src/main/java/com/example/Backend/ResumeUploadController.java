package com.example.Backend;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;

import java.io.File;
import java.io.IOException;
import java.util.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173") // Allow React frontend access
public class ResumeUploadController {

    @PostMapping("/analyze-resume")
    public ResponseEntity<Map<String, Object>> analyzeResume(@RequestParam("resume") MultipartFile file) {
        if (file.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }

        try {

            String uploadDir = System.getProperty("user.dir") + "/uploads/";
            File directory = new File(uploadDir);
            if (!directory.exists()) {
                directory.mkdirs();
            }
            file.transferTo(new File(uploadDir + file.getOriginalFilename()));


            Map<String, Object> result = new HashMap<>();
            Random random = new Random();
            int score = 70 + random.nextInt(30);

            List<String> strengths = Arrays.asList(
                    "Strong experience in React & JavaScript",
                    "Good use of action verbs",
                    "Clean resume formatting"
            );

            List<String> weaknesses = Arrays.asList(
                    "Lack of leadership roles",
                    "Missing keywords for targeted role"
            );

            result.put("score", score);
            result.put("strengths", strengths);
            result.put("weaknesses", weaknesses);

            return ResponseEntity.ok(result);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
}
