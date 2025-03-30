package com.wiz.wiz_backend.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.security.core.Authentication;
import com.wiz.wiz_backend.util.JwtTokenProvider;
import java.io.IOException;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtTokenProvider jwtTokenProvider;

    public JwtAuthenticationFilter(JwtTokenProvider jwtTokenProvider) {
        this.jwtTokenProvider = jwtTokenProvider;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws ServletException, IOException {
            
        // Removed manual CORS header setting - Spring Security's CorsFilter handles this now.

        // Removed the explicit OPTIONS check. Spring's CorsFilter should handle preflight.
        // if ("OPTIONS".equalsIgnoreCase(request.getMethod())) {
        //     response.setStatus(HttpServletResponse.SC_OK);
        //     return;
        // }

        // Handle preflight requests - Spring Security's CorsFilter should handle this, 
        // but keeping this check might be safer depending on filter order nuances.
        // If issues persist, consider removing this block as well.
        if ("OPTIONS".equalsIgnoreCase(request.getMethod())) {
            response.setStatus(HttpServletResponse.SC_OK);
            return;
        }

        String path = request.getRequestURI();
        
        // Bypass token validation for public endpoints - Now handled by shouldNotFilter
        // if (path.startsWith("/api/auth/login") || path.startsWith("/api/auth/register")) {
        //     chain.doFilter(request, response);
        //     return;
        // }

        try {
            String token = jwtTokenProvider.resolveToken(request);
            if (token != null && jwtTokenProvider.validateToken(token)) {
                Authentication auth = jwtTokenProvider.getAuthentication(token);
                SecurityContextHolder.getContext().setAuthentication(auth);
            } else {
                 // Clear context if token is invalid or not present for secured endpoints
                 SecurityContextHolder.clearContext();
            }
        } catch (Exception e) {
            // Ensure context is cleared on any token processing error
            SecurityContextHolder.clearContext(); 
            // Optionally log the exception
            // logger.error("Error processing JWT token", e);
        }

        chain.doFilter(request, response);
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) {
        // This filter should not process requests for the authentication endpoints
        String path = request.getRequestURI();
        return path.startsWith("/api/auth/");
    }
}
