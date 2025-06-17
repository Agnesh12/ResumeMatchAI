package com.example.Backend.Controller;

import com.example.Backend.Model.User;
import com.example.Backend.Model.UserDTO;
import com.example.Backend.Model.UserInputDTO;
import com.example.Backend.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/users")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping
    public ResponseEntity<?> createUser(@RequestBody UserInputDTO input) {
        try {
            User savedUser = userService.createUser(input);
            return ResponseEntity.status(HttpStatus.CREATED).body(new UserDTO(savedUser));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Error: " + e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateUser(@PathVariable Long id, @RequestBody UserInputDTO input) {
        try {
            User updatedUser = userService.updateUser(id, input);
            return ResponseEntity.ok(new UserDTO(updatedUser));
        } catch (RuntimeException e) {
            if (e.getMessage().equals("User not found")) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Error: " + e.getMessage());
            }
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Error: " + e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {
        if (userService.getUserById(id).isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Error: User not found.");
        }
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping
    public List<UserDTO> getAllUsers() {
        return userService.getAllUsers().stream()
                .map(UserDTO::new)
                .collect(Collectors.toList());
    }
}
