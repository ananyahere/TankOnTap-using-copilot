package com.example.server.repository;

import com.example.server.entity.Cart;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;


public interface CartRepository extends MongoRepository<Cart, String> {
    Optional<Cart> findByUser_UserId(String userId);
}
// The underscores in findByUser_UserId tell Spring Data MongoDB to access the userId field of the User object.



