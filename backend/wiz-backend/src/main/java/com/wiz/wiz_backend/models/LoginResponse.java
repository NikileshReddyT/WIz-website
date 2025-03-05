package com.wiz.wiz_backend.models;

public class LoginResponse {
    private String token;
    private Long userId;
    private String name;
    private String username;
    private String email;
    private String phone;
    private Role role;

    public LoginResponse(String token, Long userId, String name, String username, String email, String phone, Role role) {
        this.token = token;
        this.userId = userId;
        this.name = name;
        this.username = username;
        this.email = email;
        this.phone = phone;
        this.role = role;
    }

    // Getters and setters
    public String getToken() { return token; }
    public void setToken(String token) { this.token = token; }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public Role getRole() { return role; }
    public void setRole(Role role) { this.role = role; }
}
