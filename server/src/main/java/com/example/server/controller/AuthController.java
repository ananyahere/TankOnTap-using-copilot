package com.example.server.controller;

import com.example.server.entity.JWTRequest;
import com.example.server.entity.JWTResponse;
import com.example.server.entity.User;
import com.example.server.service.AuthService;
import com.example.server.service.JWTService;
import com.example.server.service.UserService;

import jakarta.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    private AuthService authService;

    @Autowired
    private JWTService jwtService;

    @Autowired
    private UserService userService;

    @PostConstruct
    public void initRoles() {
        AuthService authService = new AuthService();
        authService.initRoles();
    }
    
    @PostMapping("/register")
    public ResponseEntity<User> registerUser(@RequestBody User user) {
        User registeredUser = authService.registerUser(user);
        return ResponseEntity.ok(registeredUser);
    }

    @PostMapping("/authenticate")
    public ResponseEntity<JWTResponse> authenticateUser(@RequestParam String username, @RequestParam String password) {
        JWTRequest jwtRequest = new JWTRequest(username, password);
        JWTResponse jwtResponse = jwtService.createJwtToken(jwtRequest);
        return ResponseEntity.ok(jwtResponse);
    }

    @PostMapping("/setCity")
    public ResponseEntity<User> setCity(@RequestParam String userId, @RequestParam String city) {
        User user = userService.updateCity(userId, city);
        return ResponseEntity.ok(user);
    }
    
}


