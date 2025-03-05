package com.wiz.wiz_backend.controller;

import com.wiz.wiz_backend.models.AddUserRequest;
import com.wiz.wiz_backend.models.User;
import com.wiz.wiz_backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping
    public ResponseEntity<?> addUser(@RequestBody AddUserRequest addUserRequest) {
        try {
            // Updated to include username and phone
            User user = userService.createUser(
                    addUserRequest.getName(), 
                    addUserRequest.getUsername(),
                    addUserRequest.getEmail(),
                    addUserRequest.getPassword(), 
                    addUserRequest.getPhone(), 
                    addUserRequest.getRole()
            );
            return ResponseEntity.ok("User created successfully with ID: " + user.getId());
        } catch (RuntimeException ex) {
            return ResponseEntity.badRequest().body(ex.getMessage());
        }
    }
}
