package com.bookstore.repositories;

import com.bookstore.entities.User;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository extends MongoRepository<User, String> {
    public User findByUsernameAndPassword(String username, String password);
}