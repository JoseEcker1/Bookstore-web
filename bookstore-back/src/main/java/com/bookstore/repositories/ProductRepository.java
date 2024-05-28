package com.bookstore.repositories;

import com.bookstore.entities.Product;
import org.springframework.data.mongodb.repository.MongoRepository;
public interface ProductRepository extends MongoRepository<Product, String> {
}