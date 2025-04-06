package com.example.Backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/users") // ✅ Single controller for users
public class UserController {

    private final UserRepository userRepository;
    private final UserSkillRepository userSkillRepository;

    @Autowired
    public UserController(UserRepository userRepository, UserSkillRepository userSkillRepository) {
        this.userRepository = userRepository;
        this.userSkillRepository = userSkillRepository;
    }

    @PostMapping
    public ResponseEntity<?> createUser(@RequestBody UserInputDTO input) {
        // ✅ Check if the email already exists
        Optional<User> existingUser = userRepository.findByEmail(input.getEmail());
        if (existingUser.isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body("Error: Email already exists. Please use a different email.");
        }

        // Create a new User entity
        User user = new User();
        user.setEmail(input.getEmail());
        user.setName(input.getName());
        user.setTitle(input.getTitle());
        user.setDescription(input.getDescription());
        user.setLocation(input.getLocation());

        // Save user first to get an ID
        User savedUser = userRepository.save(user);

        // ✅ If skills are provided, create and save UserSkill entities
        if (input.getSkillsRequired() != null && !input.getSkillsRequired().isEmpty()) {
            List<UserSkill> skills = input.getSkillsRequired().stream()
                    .map(skillStr -> new UserSkill(skillStr, savedUser))
                    .collect(Collectors.toList());

            userSkillRepository.saveAll(skills); // ✅ Save skills in DB
            savedUser.setSkillsRequired(skills);
        }

        return ResponseEntity.status(HttpStatus.CREATED).body(new UserDTO(savedUser));
    }
    @PutMapping("/{id}")
    public ResponseEntity<UserDTO> updateUser(@PathVariable Long id, @RequestBody UserInputDTO input) {
        Optional<User> optionalUser = userRepository.findById(id);
        if (optionalUser.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        User user = optionalUser.get();
        user.setEmail(input.getEmail());
        user.setName(input.getName());
        user.setTitle(input.getTitle());
        user.setDescription(input.getDescription());
        user.setLocation(input.getLocation());

        // Update skills if provided
        if (input.getSkillsRequired() != null && !input.getSkillsRequired().isEmpty()) {
            userSkillRepository.deleteAll(user.getSkillsRequired()); // Clear old skills
            List<UserSkill> skills = input.getSkillsRequired().stream()
                    .map(skillStr -> new UserSkill(skillStr, user))
                    .collect(Collectors.toList());
            userSkillRepository.saveAll(skills);
            user.setSkillsRequired(skills);
        }

        User updatedUser = userRepository.save(user);
        return new ResponseEntity<>(new UserDTO(updatedUser), HttpStatus.OK);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {
        Optional<User> optionalUser = userRepository.findById(id);
        if (optionalUser.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Error: User not found.");
        }

        User user = optionalUser.get();

        // ✅ Delete associated skills first (to avoid foreign key constraint errors)
        userSkillRepository.deleteAll(user.getSkillsRequired());

        // ✅ Now delete the user
        userRepository.delete(user);

        return ResponseEntity.status(HttpStatus.NO_CONTENT).build(); // 204 No Content response
    }



    @GetMapping
    public List<UserDTO> getAllUsers() { // ✅ GET method works correctly
        return userRepository.findAll().stream()
                .map(UserDTO::new)
                .collect(Collectors.toList());
    }
}
