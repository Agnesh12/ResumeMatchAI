package com.example.Backend;

import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import java.util.*;

@RestController
@RequestMapping("/api/jobs")
@CrossOrigin(origins = "*") // Allow frontend to access this API
public class JobController {

    private final JobService jobService;

    public JobController(JobService jobService) {
        this.jobService = jobService;
    }

    // ✅ Get recommended jobs (Fixed - No Duplicate)
    @PostMapping("/recommendations")
    public ResponseEntity<List<Job>> getRecommendedJobs(
            @RequestBody Set<String> candidateSkills,
            @RequestParam int page,
            @RequestParam int size) {
        return ResponseEntity.ok(jobService.getRecommendedJobs(candidateSkills, page, size));
    }

    // ✅ Fetch all jobs
    @GetMapping
    public ResponseEntity<List<Job>> getAllJobs() {
        return ResponseEntity.ok(jobService.getAllJobs());
    }

    // ✅ Fetch paginated jobs
    @GetMapping("/paginated")
    public ResponseEntity<Page<Job>> getPaginatedJobs(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        return ResponseEntity.ok(jobService.getPaginatedJobs(page, size));
    }

    // ✅ Fetch jobs by type
    @GetMapping("/type")
    public ResponseEntity<List<Job>> getJobsByType(@RequestParam String jobType) {
        return ResponseEntity.ok(jobService.getJobsByType(jobType));
    }

    // ✅ Fetch jobs with filtering
    @GetMapping("/filter")
    public ResponseEntity<List<Job>> filterJobs(
            @RequestParam(required = false) String jobType,
            @RequestParam(required = false) String location,
            @RequestParam(required = false) String skills) {
        return ResponseEntity.ok(jobService.filterJobs(jobType, location, skills));
    }
}
