package com.example.Backend;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Component
public class DatabaseTestRunner implements CommandLineRunner {
    private final UserRepository userRepository;
    private final UserSkillRepository userSkillRepository;

    public DatabaseTestRunner(UserRepository userRepository, UserSkillRepository userSkillRepository) {
        this.userRepository = userRepository;
        this.userSkillRepository = userSkillRepository;
    }

    @Override
    public void run(String... args) {
        String email = "test@example.com";


        Optional<User> existingUser = userRepository.findByEmail(email);
        if (existingUser.isEmpty()) {
            User user = new User(email, "John Doe", "Software Engineer",
                    "Looking for a Java developer with 2+ years of experience.", "Remote");


            user = userRepository.save(user);

            // Create skills and associate them with the user
            UserSkill skill1 = new UserSkill("Java", user);
            UserSkill skill2 = new UserSkill("Spring Boot", user);
            UserSkill skill3 = new UserSkill("SQL", user);

            List<UserSkill> skills = Arrays.asList(skill1, skill2, skill3);
            userSkillRepository.saveAll(skills);

            System.out.println("User and skills saved successfully!");
        } else {
            System.out.println("User with email '" + email + "' already exists. Skipping insertion.");
        }
    }
}
