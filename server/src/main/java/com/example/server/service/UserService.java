package com.example.server.service;

import com.example.server.entity.Address;
import com.example.server.entity.User;
import com.example.server.entity.Vehicle;
import com.example.server.exception.ResourceNotFoundException;
import com.example.server.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User getUserById(String userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id " + userId));
    }

    public User createUser(User user) {
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

    public User saveAddress(String userId, Address address) {
        User user = getUserById(userId);
        user.getAddresses().add(address);
        return userRepository.save(user);
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

