package com.example.server.repository;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.server.entity.Role;

public interface RoleRepository extends MongoRepository<Role, String> {
    Optional<Role> findByTitle(String roleName);
}
