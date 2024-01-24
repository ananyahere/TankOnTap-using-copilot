package com.example.server.service;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.server.entity.Fuel;
import com.example.server.exception.ResourceNotFoundException;
import com.example.server.repository.FuelRepository;

@Service
public class FuelService {

    @Autowired
    private FuelRepository fuelRepository;

    public List<Fuel> getAllFuels() {
        return fuelRepository.findAll();
    }

    public Fuel getFuelById(String fuelId) {
        return fuelRepository.findById(fuelId)
                .orElseThrow(() -> new ResourceNotFoundException("Fuel not found with id " + fuelId));
    }

    public Fuel addFuel(Fuel fuel) {
        return fuelRepository.save(fuel);
    }

    public Fuel editFuel(String fuelId, Fuel updatedFuel) {
        Fuel existingFuel = getFuelById(fuelId);
        existingFuel.setType(updatedFuel.getType());
        existingFuel.setAmountInInventory(updatedFuel.getAmountInInventory());
        existingFuel.setUnitOfAmountInInventory(updatedFuel.getUnitOfAmountInInventory());
        existingFuel.setSupplier(updatedFuel.getSupplier());
        existingFuel.setBasePriceHyd(updatedFuel.getBasePriceHyd());
        existingFuel.setBasePriceBlr(updatedFuel.getBasePriceBlr());
        existingFuel.setBasePriceBhu(updatedFuel.getBasePriceBhu());
        return fuelRepository.save(existingFuel);
    }

    public List<Fuel> searchFuelByType(String type) {
        return fuelRepository.findByType(type);
    }
}