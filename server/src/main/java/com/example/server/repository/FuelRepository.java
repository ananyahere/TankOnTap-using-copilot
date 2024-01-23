package com.example.server.repository;

import com.example.server.entity.Fuel;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface FuelRepository extends MongoRepository<Fuel, String> {
    
    Optional<Fuel> findByTypeIgnoreCase(String type);
}