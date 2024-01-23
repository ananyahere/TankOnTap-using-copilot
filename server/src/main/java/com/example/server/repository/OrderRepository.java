package com.example.server.repository;

import com.example.server.entity.Order;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface OrderRepository extends MongoRepository<Order, String> {
    
    List<Order> findByUser_UserId(String userId);
}
