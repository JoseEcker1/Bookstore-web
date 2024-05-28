package com.bookstore.controllers;

import com.bookstore.controllers.exceptions.InvalidAccessException;
import com.bookstore.entities.DTO.UserResponseDTO;
import com.bookstore.entities.Order;
import com.bookstore.entities.User;
import com.bookstore.services.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.security.NoSuchAlgorithmException;
import java.util.List;
import java.util.Optional;

@CrossOrigin
@RestController
@RequestMapping(value = "/users")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/pedidos/{id}")
    public ResponseEntity<List<Order>> findUserOrders(@PathVariable String id){
        Optional<User> u = userService.findUserById(id);
        return ResponseEntity.ok(u.orElseThrow(InvalidAccessException::new).getOrders());
    }

    @PostMapping("/cadastrar")
    public ResponseEntity<User> insertUser(@RequestBody @Valid User u) throws NoSuchAlgorithmException {
        return ResponseEntity.ok(userService.insert((u)));
    }

    @PostMapping("/acessar")
    public ResponseEntity<UserResponseDTO> access(@RequestBody User u) throws NoSuchAlgorithmException {
        UserResponseDTO userResponseDTO = userService.findUser(u);
        return ResponseEntity.ok(userResponseDTO);
    }

}