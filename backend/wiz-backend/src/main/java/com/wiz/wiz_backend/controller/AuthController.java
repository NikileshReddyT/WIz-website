package com.wiz.wiz_backend.controller;

import com.wiz.wiz_backend.models.*;
import com.wiz.wiz_backend.service.UserService;
import com.wiz.wiz_backend.util.JwtTokenProvider;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtTokenProvider jwtUtil;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody RegisterRequest registerRequest) {
        try {
            User user = userService.registerUser(registerRequest);
            return ResponseEntity.ok("User registered successfully with ID: " + user.getId());
        } catch (RuntimeException ex) {
            return ResponseEntity.badRequest().body(ex.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginRequest loginRequest) {
        try {
            System.out.println(loginRequest.getEmail());
            System.out.println(loginRequest.getPassword());
            User user = userService.loginUser(loginRequest);
            String token = jwtUtil.generateToken(user.getEmail(), user.getRole());
            LoginResponse response = new LoginResponse(token, user.getId(), user.getName(), user.getEmail(), user.getRole());
            return ResponseEntity.ok(response);
        } catch (RuntimeException ex) {
            System.out.println(ex.getMessage());
            return ResponseEntity.badRequest().body(ex.getMessage());
        }
    }
}