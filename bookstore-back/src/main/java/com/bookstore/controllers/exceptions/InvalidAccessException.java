package com.bookstore.controllers.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;
@ResponseStatus(HttpStatus.UNAUTHORIZED)
public class InvalidAccessException extends RuntimeException{
    public InvalidAccessException(){
    }
}