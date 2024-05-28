package com.bookstore.services;

import com.bookstore.entities.DTO.UserResponseDTO;
import com.bookstore.entities.User;
import com.bookstore.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigInteger;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public UserResponseDTO findUser(User u) throws NoSuchAlgorithmException {

        UserResponseDTO userResponseDTO = null;
        User foundUser = userRepository.findByUsernameAndPassword(u.getUsername(), md5(u.getPassword()));

        if(foundUser != null){
            userResponseDTO = new UserResponseDTO(foundUser.getId(), foundUser.getUsername());
        }

        return userResponseDTO;
    }

    public Optional<User> findUserById(String id){
        return userRepository.findById(id);
    }

    public User insert(User obj) throws NoSuchAlgorithmException {
        obj.setPassword(md5(obj.getPassword()));
        return userRepository.save(obj);
    }

    public String md5(String password) throws NoSuchAlgorithmException {
        MessageDigest md = MessageDigest.getInstance("MD5");
        BigInteger hash = new BigInteger(1, md.digest(password.getBytes()));
        return hash.toString(16);
    }

}