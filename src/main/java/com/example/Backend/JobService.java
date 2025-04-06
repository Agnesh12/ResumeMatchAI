package com.example.Backend;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class JobService {

    private final JobRepository jobRepository;
    private static final Logger logger = LoggerFactory.getLogger(JobService.class);

    public JobService(JobRepository jobRepository) {
        this.jobRepository = jobRepository;
    }

    // Fetch all jobs
    public List<Job> getAllJobs() {
        return jobRepository.findAll();
    }

    // Fetch paginated jobs
    public Page<Job> getPaginatedJobs(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return jobRepository.findAll(pageable);
    }

    // Fetch jobs by job type
    public List<Job> getJobsByType(String jobType) {
        return jobRepository.findByJobType(jobType);
    }

    // Fetch jobs with filtering
    public List<Job> filterJobs(String jobType, String location, String skills) {
        return jobRepository.findJobs(jobType, location, skills);
    }

    // Define skill weights (higher weight = more relevant)
    private static final Map<String, Integer> SKILL_WEIGHTS = Map.of(
            "java", 10,
            "spring boot", 8,
            "python", 9,
            "machine learning", 9,
            "react", 7,
            "node.js", 7,
            "sql", 6,
            "docker", 5
    );

    // Calculate job match score based on skill similarity
    private int calculateMatchScore(Set<String> candidateSkills, Job job) {
        String jobRequirements = job.getRequirements().toLowerCase();
        int score = 0;

        logger.info("Evaluating Job: {}", job.getTitle());  // Log job title
        logger.info("Job Requirements: {}", jobRequirements);

        for (String skill : candidateSkills) {
            String lowerSkill = skill.toLowerCase();

            // If the skill is exactly present, give full weight
            if (jobRequirements.contains(lowerSkill)) {
                int weight = SKILL_WEIGHTS.getOrDefault(lowerSkill, 3);
                score += weight;
                logger.info("Matched Skill: {}, Weight: {}, New Score: {}", skill, weight, score);
            }
            // Check for partial match (e.g., "Spring Boot" should match "Spring Framework")
            else {
                for (String jobSkill : jobRequirements.split(",")) {
                    jobSkill = jobSkill.trim();
                    if (jobSkill.contains(lowerSkill) || lowerSkill.contains(jobSkill)) {
                        score += (SKILL_WEIGHTS.getOrDefault(lowerSkill, 3) / 2); // Half score for partial match
                    }
                }
            }
        }

        logger.info("Final Score for {}: {}", job.getTitle(), score);
        return score;
    }

    // Get job recommendations based on similarity scoring (Paginated)
    public List<Job> getRecommendedJobs(Set<String> candidateSkills, int page, int size) {
        List<Job> allJobs = jobRepository.findAll();

        List<Job> recommendedJobs = allJobs.stream()
                .map(job -> new AbstractMap.SimpleEntry<>(job, calculateMatchScore(candidateSkills, job)))
                .filter(entry -> entry.getValue() > 0) // Ensure at least 1 matching skill
                .sorted((a, b) -> Integer.compare(b.getValue(), a.getValue())) // Sort by highest score
                .map(Map.Entry::getKey)
                .collect(Collectors.toList());

        // Paginate results safely
        int start = page * size;
        if (start >= recommendedJobs.size()) {
            return Collections.emptyList(); // Prevent IndexOutOfBoundsException
        }
        int end = Math.min(start + size, recommendedJobs.size());

        return recommendedJobs.subList(start, end);
    }
}
