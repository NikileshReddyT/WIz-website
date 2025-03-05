package com.wiz.wiz_backend.service;

import com.wiz.wiz_backend.models.User;
import com.wiz.wiz_backend.models.RegisterRequest;
import com.wiz.wiz_backend.models.Role;
import com.wiz.wiz_backend.models.LoginRequest;
import com.wiz.wiz_backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    public User registerUser(RegisterRequest registerRequest) {
        // Removed confirmPassword check since it's no longer part of RegisterRequest
        Optional<User> existingUser = userRepository.findByEmail(registerRequest.getEmail());
        if (existingUser.isPresent()) {
            throw new RuntimeException("User with this email already exists.");
        }

        String hashedPassword = passwordEncoder.encode(registerRequest.getPassword());
        // Create new user including username and phone, with default role USER
        User newUser = new User(
                registerRequest.getName(),
                registerRequest.getUsername(),
                registerRequest.getEmail(),
                hashedPassword,
                registerRequest.getPhone(),
                Role.USER
        );
        return userRepository.save(newUser);
    }

    // Method for admin to create users with any role, now including username and phone
    public User createUser(String name, String username, String email, String password, String phone, Role role) {
        Optional<User> existingUser = userRepository.findByEmail(email);
        if (existingUser.isPresent()) {
            throw new RuntimeException("User with this email already exists.");
        }
        String hashedPassword = passwordEncoder.encode(password);
        User newUser = new User(name, username, email, hashedPassword, phone, role);
        return userRepository.save(newUser);
    }

    public User loginUser(LoginRequest loginRequest) {
        Optional<User> userOpt = userRepository.findByEmail(loginRequest.getEmail());
        if (!userOpt.isPresent() || !passwordEncoder.matches(loginRequest.getPassword(), userOpt.get().getPassword())) {
            throw new RuntimeException("Invalid email or password.");
        }
        return userOpt.get();
    }
}
