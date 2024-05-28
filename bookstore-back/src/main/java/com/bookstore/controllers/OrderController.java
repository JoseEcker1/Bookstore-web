package com.bookstore.controllers;

import com.bookstore.entities.DTO.OrderDTO;
import com.bookstore.entities.Order;
import com.bookstore.services.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;

@CrossOrigin
@RestController
@RequestMapping("/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @PostMapping
    public ResponseEntity<Order> makeOrder(@RequestBody OrderDTO o) throws NoSuchAlgorithmException, InvalidKeySpecException {
        Order orderSaved = orderService.insert(o);
        return ResponseEntity.ok(orderSaved);
    }
}