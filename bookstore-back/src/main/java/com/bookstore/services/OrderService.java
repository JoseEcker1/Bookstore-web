package com.bookstore.services;

import com.bookstore.entities.DTO.OrderDTO;
import com.bookstore.entities.Order;
import com.bookstore.entities.User;
import com.bookstore.repositories.OrderRepository;
import com.bookstore.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;
import java.util.Optional;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private UserRepository userRepository;

    public Order insert(OrderDTO oDTO) throws NoSuchAlgorithmException, InvalidKeySpecException {
        Optional<User> u = userRepository.findById(oDTO.getClientId());
        Order ord = new Order(null, u.get(), oDTO.getItems());
        Order orderSaved = orderRepository.save(ord);
        u.get().addOrder(orderSaved);
        userRepository.save(u.get());
        return orderSaved;
    }
}