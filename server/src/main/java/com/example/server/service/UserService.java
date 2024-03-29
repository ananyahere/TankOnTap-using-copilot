package com.example.server.service;

import com.example.server.entity.Address;
import com.example.server.entity.Role;
import com.example.server.entity.User;
import com.example.server.entity.Vehicle;
import com.example.server.exception.ResourceNotFoundException;
import com.example.server.repository.RoleRepository;
import com.example.server.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    public User getUserById(String userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id " + userId));
    }

    public User createUser(User user) {
        Role userRole = roleRepository.findByTitle("USER")
            .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
        user.setRoles(Collections.singleton(userRole));
        System.out.println(userRole);
        return userRepository.save(user);
    }

    public List<Address> getAddressesByUserId(String userId) {
        User user = getUserById(userId);
        return user.getAddresses();
    }

    public Address getAddressById(String userId, String addressId) {
        User user = getUserById(userId);
        return user.getAddresses().stream()
                .filter(address -> address.getAddressId().equals(addressId))
                .findFirst()
                .orElseThrow(() -> new ResourceNotFoundException("Address not found with id " + addressId));
    }

    public Address saveAddress(String userId, Address address) {
        User user = getUserById(userId);
        if (user.getAddresses() == null) {
            user.setAddresses(new ArrayList<>());
        }
        user.getAddresses().add(address);
        userRepository.save(user);
        return address;
    }

    public List<Vehicle> getVehiclesByUserId(String userId) {
        User user = getUserById(userId);
        return user.getVehicles();
    }

    public Vehicle getVehicleById(String userId, String vehicleId) {
        User user = getUserById(userId);
        return user.getVehicles().stream()
                .filter(vehicle -> vehicle.getVehicleId().equals(vehicleId))
                .findFirst()
                .orElseThrow(() -> new ResourceNotFoundException("Vehicle not found with id " + vehicleId));
    }

    public User saveVehicle(String userId, Vehicle vehicle) {
        User user = getUserById(userId);
        if (user.getVehicles() == null) {
            user.setVehicles(new ArrayList<>());
        }
        user.getVehicles().add(vehicle);
        return userRepository.save(user);
    }

    public User updateCity(String userId, String newCity) {
        User user = getUserById(userId);
        user.setCity(newCity);
        return userRepository.save(user);
    }
    
    public User updateName(String userId, String newName) {
        User user = getUserById(userId);
        user.setName(newName);
        return userRepository.save(user);
    }
    
    public User createUserWithEmail(String email) {
        User user = new User();
        user.setEmail(email);
        return userRepository.save(user);
    }
    
    public User updateAddress(String userId, String addressId, Address updatedAddress) {
        User user = getUserById(userId);
        user.getAddresses().stream()
            .filter(address -> address.getAddressId().equals(addressId))
            .findFirst()
            .ifPresent(address -> {
                address.setType(updatedAddress.getType());
                address.setCity(updatedAddress.getCity());
                address.setReceiver(updatedAddress.getReceiver());
                address.setPhone(updatedAddress.getPhone());
                address.setLocation(updatedAddress.getLocation());
            });
        return userRepository.save(user);
    }
    
    public User updateVehicle(String userId, String vehicleId, Vehicle updatedVehicle) {
        User user = getUserById(userId);
        user.getVehicles().stream()
            .filter(vehicle -> vehicle.getVehicleId().equals(vehicleId))
            .findFirst()
            .ifPresent(vehicle -> {
                vehicle.setFuelType(updatedVehicle.getFuelType());
                vehicle.setModel(updatedVehicle.getModel());
                vehicle.setCarType(updatedVehicle.getCarType());
                vehicle.setColor(updatedVehicle.getColor());
            });
        return userRepository.save(user);
    }
}

