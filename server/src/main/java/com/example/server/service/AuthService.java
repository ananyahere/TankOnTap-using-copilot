package com.example.server.service;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.server.entity.Cart;
import com.example.server.entity.Role;
import com.example.server.entity.User;
import com.example.server.repository.CartRepository;
import com.example.server.repository.UserRepository;

@Service
public class AuthService {
    
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    private RoleService roleService;

    @Autowired
    private CartRepository cartRepository;

    public void initRoles() {
        Role userRole = new Role("USER", "User role");
        Role adminRole = new Role("ADMIN", "Admin role");
        Role createdUserRole = roleService.createRole(userRole);
        Role createdAdminRole = roleService.createRole(adminRole);
    }
    
    public User registerUser(User user) {
        // Check if a user with the same username already exists
        if (userRepository.findByUsername(user.getUsername()).isPresent()) {
            throw new IllegalArgumentException("Username is already taken");
        }

        // Encode the user's password
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        // Save the new user
        User savedUser = userService.createUser(user);

        // Create a new cart for the user
        Cart cart = new Cart();
        cart.setUser(savedUser);
        cart.setFuels(new ArrayList<>());

        // Save the new cart
        cartRepository.save(cart);

        return savedUser;
    }    
}   



