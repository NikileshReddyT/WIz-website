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
            System.out.println(registerRequest.getEmail());
            User user = userService.registerUser(registerRequest);
            String token = jwtUtil.generateToken(user.getEmail(), user.getRole());
            LoginResponse response = new LoginResponse(
                    token, 
                    user.getId(), 
                    user.getName(), 
                    user.getUsername(),
                    user.getEmail(), 
                    user.getPhone(),
                    user.getRole()
            ); 
            return ResponseEntity.ok(response);
        } catch (RuntimeException ex) {
            return ResponseEntity.badRequest().body(ex.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginRequest loginRequest) {
        try {
            User user = userService.loginUser(loginRequest);
            String token = jwtUtil.generateToken(user.getEmail(), user.getRole());
            // Updated LoginResponse to include username and phone
            LoginResponse response = new LoginResponse(
                    token, 
                    user.getId(), 
                    user.getName(), 
                    user.getUsername(),
                    user.getEmail(), 
                    user.getPhone(), 
                    user.getRole()
            );
            return ResponseEntity.ok(response);
        } catch (RuntimeException ex) {
            return ResponseEntity.badRequest().body(ex.getMessage());
        }
    }
}
