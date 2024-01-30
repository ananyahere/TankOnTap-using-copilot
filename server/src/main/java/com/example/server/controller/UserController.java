package com.example.server.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.server.entity.Address;
import com.example.server.entity.User;
import com.example.server.entity.Vehicle;
import com.example.server.service.UserService;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/{userId}")
    public ResponseEntity<User> getUserById(@PathVariable String userId) {
        User user = userService.getUserById(userId);
        return ResponseEntity.ok(user);
    }

    @GetMapping("/{userId}/addresses")
    public ResponseEntity<List<Address>> getAddressesByUserId(@PathVariable String userId) {
        List<Address> addresses = userService.getAddressesByUserId(userId);
        return ResponseEntity.ok(addresses);
    }

    @PostMapping("/{userId}/addresses")
    public ResponseEntity<Address> saveAddress(@PathVariable String userId, @RequestBody Address address) {
        Address savedAddress = userService.saveAddress(userId, address);
        return ResponseEntity.ok(savedAddress);
    }

    @GetMapping("/{userId}/vehicles")
    public ResponseEntity<List<Vehicle>> getVehiclesByUserId(@PathVariable String userId) {
        List<Vehicle> vehicles = userService.getVehiclesByUserId(userId);
        return ResponseEntity.ok(vehicles);
    }

    @PostMapping("/{userId}/vehicles")
    public ResponseEntity<User> saveVehicle(@PathVariable String userId, @RequestBody Vehicle vehicle) {
        User updatedUser = userService.saveVehicle(userId, vehicle);
        return ResponseEntity.ok(updatedUser);
    }

    @PostMapping("/{userId}/updateCity")
    public ResponseEntity<User> updateCity(@PathVariable String userId, @RequestBody String city) {
        User updatedUser = userService.updateCity(userId, city);
        return ResponseEntity.ok(updatedUser);
    }

    @PostMapping("/{userId}/updateName")
    public ResponseEntity<User> updateName(@PathVariable String userId, @RequestBody String name) {
        User updatedUser = userService.updateName(userId, name);
        return ResponseEntity.ok(updatedUser);
    }
}
