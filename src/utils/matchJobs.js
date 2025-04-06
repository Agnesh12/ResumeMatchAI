export function matchJobs(resumeKeywords, jobList) {
    if (!resumeKeywords || resumeKeywords.length === 0) return [];
  
    return jobList.filter((job) =>
      job.requiredSkills.some(skill =>
        resumeKeywords.map(k => k.toLowerCase()).includes(skill.toLowerCase())
      )
    );
  }
  