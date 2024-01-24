package com.example.server.repository;

import com.example.server.entity.Order;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface OrderRepository extends MongoRepository<Order, String> {
    
    List<Order> findByUser_UserId(String userId);
    Optional<Order> findTopByUser_UserIdOrderByOrderTimeDesc(String userId);
}
