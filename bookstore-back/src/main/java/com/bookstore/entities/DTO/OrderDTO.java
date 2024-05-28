package com.bookstore.entities.DTO;

import com.bookstore.entities.Item;
import lombok.Data;

import java.util.List;

@Data
public class OrderDTO {

    private String clientId;
    private List<Item> items;

}