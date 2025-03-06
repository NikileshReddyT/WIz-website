package com.wiz.wiz_backend.util;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Component;

import com.wiz.wiz_backend.models.Role;

import java.util.Collections;
import java.util.Date;

@Component
public class JwtTokenProvider {

    private String secret = "25046362afa94832edc85b4b6b15d1e83923ef1c6bc5e324cc366ac5a9bc8a95f6756071666fa4f42f2ea57da893588b028d82d631b08685659f5658a5e9fb070523f5309552c151067d244eb1bbea6729fd7bcc470aa687e0e7519b62256ff7080847ea30fd652f8384cea3b1be6abc5ef093d26acb234509bcc001d8fee2adae06be385406224a354a293d9028afcb789c8040809a28db3e86921e2dfad38398781dd11646052275e2c85d99fe72cc1af760071f601b74e6e2a4fc3b8dbce6fd5f3c96a75018269c39c1df4936a9833ec086c42f14d4f1c9c00015d630994c2bca7779442a6a53ea495a7ceb913a50902a22d82134d5ca7f96c65e9973e10d"; // Replace with a secure key in production
    private int expirationTime = 1000 * 60 * 60; // 1 hour

    public String generateToken(String email, Role role) {
        Claims claims = Jwts.claims().setSubject(email);
        claims.put("role", role.name());
        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + expirationTime))
                .signWith(SignatureAlgorithm.HS512, secret)
                .compact();
    }

    public String extractEmail(String token) {
        return Jwts.parser().setSigningKey(secret).parseClaimsJws(token).getBody().getSubject();
    }

    public Role extractRole(String token) {
        return Role.valueOf((String) Jwts.parser().setSigningKey(secret).parseClaimsJws(token).getBody().get("role"));
    }

    public boolean validateToken(String token, String email) {
        return (email.equals(extractEmail(token)) && !isTokenExpired(token));
    }

    private boolean isTokenExpired(String token) {
        return Jwts.parser().setSigningKey(secret).parseClaimsJws(token).getBody().getExpiration().before(new Date());
    }

    public String resolveToken(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }

    public boolean validateToken(String token) {
        try {
            Claims claims = Jwts.parser().setSigningKey(secret).parseClaimsJws(token).getBody();
            return !isTokenExpired(claims.getExpiration());
        } catch (Exception e) {
            return false;
        }
    }

    private boolean isTokenExpired(Date expiration) {
        return expiration.before(new Date());
    }

    public Authentication getAuthentication(String token) {
        try {
            Claims claims = Jwts.parser().setSigningKey(secret).parseClaimsJws(token).getBody();
            String email = claims.getSubject();
            String role = (String) claims.get("role");
            
            if (email == null || role == null) {
                throw new IllegalArgumentException("Invalid token claims");
            }

            return new UsernamePasswordAuthenticationToken(
                email,
                null,
                Collections.singletonList(new SimpleGrantedAuthority("ROLE_" + role))
            );
        } catch (Exception e) {
            throw new IllegalArgumentException("Invalid token");
        }
    }
}