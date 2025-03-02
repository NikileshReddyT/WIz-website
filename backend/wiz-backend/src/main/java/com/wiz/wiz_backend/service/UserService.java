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
        if (!registerRequest.getPassword().equals(registerRequest.getConfirmPassword())) {
            throw new RuntimeException("Passwords do not match.");
        }

        Optional<User> existingUser = userRepository.findByEmail(registerRequest.getEmail());
        if (existingUser.isPresent()) {
            throw new RuntimeException("User with this email already exists.");
        }

        String hashedPassword = passwordEncoder.encode(registerRequest.getPassword());
        User newUser = new User(registerRequest.getName(), registerRequest.getEmail(), hashedPassword, Role.USER);
        return userRepository.save(newUser);
    }

    // Method for admin to create users with any role
    public User createUser(String name, String email, String password, Role role) {
        Optional<User> existingUser = userRepository.findByEmail(email);
        if (existingUser.isPresent()) {
            throw new RuntimeException("User with this email already exists.");
        }
        String hashedPassword = passwordEncoder.encode(password);
        User newUser = new User(name, email, hashedPassword, role);
        return userRepository.save(newUser);
    }

    public User loginUser(LoginRequest loginRequest) {
        System.out.println(loginRequest.getEmail());
        System.out.println(loginRequest.getPassword());
        Optional<User> userOpt = userRepository.findByEmail(loginRequest.getEmail());
        System.out.println(userOpt.get().getEmail());
        if (!userOpt.isPresent() || !passwordEncoder.matches(loginRequest.getPassword(), userOpt.get().getPassword())) {
            throw new RuntimeException("Invalid email or password.");
        }
        return userOpt.get();
    }
}