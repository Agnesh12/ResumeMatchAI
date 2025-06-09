package com.example.Backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserSkillRepository userSkillRepository;


    public User createUser(UserInputDTO input) {
        if (userRepository.findByEmail(input.getEmail()).isPresent()) {
            throw new RuntimeException("Email already exists!");
        }

        User user = new User();
        user.setEmail(input.getEmail());
        user.setName(input.getName());
        user.setTitle(input.getTitle());
        user.setDescription(input.getDescription());
        user.setLocation(input.getLocation());

        User savedUser = userRepository.save(user);

        if (input.getSkillsRequired() != null && !input.getSkillsRequired().isEmpty()) {
            List<UserSkill> skills = input.getSkillsRequired().stream()
                    .map(skillStr -> new UserSkill(skillStr, savedUser))
                    .collect(Collectors.toList());
            userSkillRepository.saveAll(skills);
            savedUser.setSkillsRequired(skills);
        }

        return savedUser;
    }


    public User updateUser(Long id, UserInputDTO input) {
        return userRepository.findById(id)
                .map(user -> {

                    if (!user.getEmail().equals(input.getEmail())) {
                        Optional<User> existingUser = userRepository.findByEmail(input.getEmail());
                        if (existingUser.isPresent() && !existingUser.get().getId().equals(id)) {
                            throw new RuntimeException("Email already exists!");
                        }
                    }

                    user.setEmail(input.getEmail());
                    user.setName(input.getName());
                    user.setTitle(input.getTitle());
                    user.setDescription(input.getDescription());
                    user.setLocation(input.getLocation());


                    if (input.getSkillsRequired() != null) {
                        userSkillRepository.deleteAll(user.getSkillsRequired());
                        List<UserSkill> skills = input.getSkillsRequired().stream()
                                .map(skillStr -> new UserSkill(skillStr, user))
                                .collect(Collectors.toList());
                        userSkillRepository.saveAll(skills);
                        user.setSkillsRequired(skills);
                    }

                    return userRepository.save(user);
                })
                .orElseThrow(() -> new RuntimeException("User not found"));
    }


    public void deleteUser(Long id) {
        userRepository.findById(id).ifPresent(user -> {
            userSkillRepository.deleteAll(user.getSkillsRequired());
            userRepository.delete(user);
        });
    }


    public List<User> getAllUsers() {
        return userRepository.findAll();
    }


    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }
}
