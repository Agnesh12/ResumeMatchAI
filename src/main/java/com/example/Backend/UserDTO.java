package com.example.Backend;

import java.util.List;
import java.util.stream.Collectors;

public class UserDTO {
    private Long id;
    private String email;
    private String name;
    private String title;
    private String description;
    private String location;
    private List<String> skillsRequired;

    public UserDTO(User user) {
        this.id = user.getId();
        this.email = user.getEmail();
        this.name = user.getName();
        this.title = user.getTitle();
        this.description = user.getDescription();
        this.location = user.getLocation();
        this.skillsRequired = (user.getSkillsRequired() != null)
                ? user.getSkillsRequired().stream()
                .map(UserSkill::getSkill) // ✅ Use correct method
                .collect(Collectors.toList())
                : List.of(); // Return empty list if null
    }

    public Long getId() { return id; }
    public String getEmail() { return email; }
    public String getName() { return name; }
    public String getTitle() { return title; }
    public String getDescription() { return description; }
    public String getLocation() { return location; }
    public List<String> getSkillsRequired() { return skillsRequired; }
}
