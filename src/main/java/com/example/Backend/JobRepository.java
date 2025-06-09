package com.example.Backend;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface JobRepository extends JpaRepository<Job, Long> {


    List<Job> findByJobType(String jobType);


    @Query("SELECT j FROM Job j WHERE " +
            "(:jobType IS NULL OR j.jobType = :jobType) AND " +
            "(:location IS NULL OR j.location LIKE %:location%) AND " +
            "(:skills IS NULL OR j.requirements LIKE %:skills%)")
    List<Job> findJobs(
            @Param("jobType") String jobType,
            @Param("location") String location,
            @Param("skills") String skills
    );


    List<Job> findAll();


    Page<Job> findAll(Pageable pageable);
}
