package com.example.Backend;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface JobRepository extends JpaRepository<Job, Long> {

    // Find jobs by jobType
    List<Job> findByJobType(String jobType);

    // Find jobs using filters
    @Query("SELECT j FROM Job j WHERE " +
            "(:jobType IS NULL OR j.jobType = :jobType) AND " +
            "(:location IS NULL OR j.location LIKE %:location%) AND " +
            "(:skills IS NULL OR j.requirements LIKE %:skills%)")
    List<Job> findJobs(
            @Param("jobType") String jobType,
            @Param("location") String location,
            @Param("skills") String skills
    );

    // Fetch all jobs
    List<Job> findAll();

    // Pagination support
    Page<Job> findAll(Pageable pageable);
}
