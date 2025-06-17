package com.example.Backend.Model;

import jakarta.persistence.*;

@Entity
public class UserSkill {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String skill;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    public UserSkill() {}

    public UserSkill(String skill, User user) {
        this.skill = skill;
        this.user = user;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getSkill() { return skill; }
    public void setSkill(String skill) { this.skill = skill; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
}
