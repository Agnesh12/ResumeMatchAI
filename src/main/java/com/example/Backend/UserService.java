package com.example.Backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    // Save user (prevents duplicate email)
    public User saveUser(User user) {
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            throw new RuntimeException("Email already exists!");
        }
        return userRepository.save(user);
    }

    // Get all users
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // Get user by ID
    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    // Update user
    public User updateUser(Long id, User updatedUser) {
        return userRepository.findById(id)
                .map(user -> {
                    // Check if email is being changed
                    if (!user.getEmail().equals(updatedUser.getEmail())) {
                        Optional<User> existingUser = userRepository.findByEmail(updatedUser.getEmail());
                        if (existingUser.isPresent() && !existingUser.get().getId().equals(id)) {
                            throw new RuntimeException("Email already exists!");
                        }
                    }

                    // Update fields
                    user.setName(updatedUser.getName());
                    user.setEmail(updatedUser.getEmail());
                    return userRepository.save(user);
                })
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    // Delete user
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }
}
