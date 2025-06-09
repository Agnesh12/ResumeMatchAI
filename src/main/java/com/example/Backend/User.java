package com.example.Backend;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "users", uniqueConstraints = @UniqueConstraint(columnNames = "email")) // ✅ Changed table name
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String email;

    private String name;
    private String title;
    private String description;
    private String location;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<UserSkill> skillsRequired = new ArrayList<>();

    public User() {}

    public User(String email, String name, String title, String description, String location) {
        this.email = email;
        this.name = name;
        this.title = title;
        this.description = description;
        this.location = location;
    }


    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public List<UserSkill> getSkillsRequired() { return skillsRequired; }


    public void setSkillsRequired(List<UserSkill> skillsRequired) {
        this.skillsRequired.clear();
        if (skillsRequired != null) {
            skillsRequired.forEach(skill -> skill.setUser(this));
            this.skillsRequired.addAll(skillsRequired);
        }
    }
}
