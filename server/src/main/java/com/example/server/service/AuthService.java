package com.example.server.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.example.server.entity.Role;
import com.example.server.entity.User;
import com.example.server.repository.UserRepository;

public class AuthService {
    
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    private RoleService roleService;

    public void initRoles() {
        Role userRole = new Role("USER", "User role");
        Role adminRole = new Role("ADMIN", "Admin role");
        roleService.createRole(userRole);
        roleService.createRole(adminRole);
    }
    
    public User registerUser(User user) {
        // Check if a user with the same username already exists
        if (userRepository.findByUsername(user.getUsername()).isPresent()) {
            throw new IllegalArgumentException("Username is already taken");
        }

        // Encode the user's password
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        // Save the new user
        return userService.createUser(user);
    }    
}   



