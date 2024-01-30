package com.example.server.controller;

import com.example.server.entity.Address;
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

    // @PostConstruct
    // public void initRoles() {
    //     authService.initRoles();
    // }
    
    @PostMapping("/register")
    public ResponseEntity<User> registerUser(@RequestBody User user) {
        User registeredUser = authService.registerUser(user);
        return ResponseEntity.ok(registeredUser);
    }

    @PostMapping("/authenticate")
    public ResponseEntity<JWTResponse> authenticateUser(@RequestBody JWTRequest jwtRequest) {
        JWTResponse jwtResponse =  jwtService.createJwtToken(jwtRequest);
        return ResponseEntity.ok(jwtResponse);
    }

    @PostMapping("/setAddress")
    public ResponseEntity<Address> setAddress(@RequestParam String userId, @RequestBody Address address) {
        Address savedAddress = userService.saveAddress(userId, address);
        return ResponseEntity.ok(savedAddress);
    }
    
}


