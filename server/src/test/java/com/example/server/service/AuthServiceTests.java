package com.example.server.service;

import com.example.server.entity.Cart;
import com.example.server.entity.Role;
import com.example.server.entity.User;
import com.example.server.repository.CartRepository;
import com.example.server.repository.UserRepository;
import com.example.server.service.AuthService;
import com.example.server.service.RoleService;
import com.example.server.service.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class AuthServiceTests {

    @InjectMocks
    private AuthService authService;

    @Mock
    private UserRepository userRepository;

    @Mock
    private UserService userService;

    @Mock
    private BCryptPasswordEncoder passwordEncoder;

    @Mock
    private RoleService roleService;

    @Mock
    private CartRepository cartRepository;

    @BeforeEach
    public void init() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    public void testInitRoles() {
        authService.initRoles();

        verify(roleService, times(1)).createRole(argThat(role -> role.getTitle().equals("USER") && role.getDescription().equals("User role")));
        verify(roleService, times(1)).createRole(argThat(role -> role.getTitle().equals("ADMIN") && role.getDescription().equals("Admin role")));
    }

    @Test
    public void testRegisterUser() {
        User user = new User();
        user.setUsername("user1");
        user.setPassword("password");
        when(userRepository.findByUsername(user.getUsername())).thenReturn(Optional.empty());
        when(passwordEncoder.encode(user.getPassword())).thenReturn("password");
        when(userService.createUser(user)).thenReturn(user);
        when(cartRepository.save(any(Cart.class))).thenReturn(new Cart());

        User result = authService.registerUser(user);

        assertEquals(user, result);
        assertEquals("password", result.getPassword());
        verify(userRepository, times(1)).findByUsername(user.getUsername());
        verify(passwordEncoder, times(1)).encode(user.getPassword());
        verify(userService, times(1)).createUser(user);
        verify(cartRepository, times(1)).save(any(Cart.class));
    }

    @Test
    public void testRegisterUserUsernameTaken() {
        User user = new User();
        user.setUsername("user1");
        when(userRepository.findByUsername(user.getUsername())).thenReturn(Optional.of(user));

        assertThrows(IllegalArgumentException.class, () -> authService.registerUser(user));
        verify(userRepository, times(1)).findByUsername(user.getUsername());
    }
}