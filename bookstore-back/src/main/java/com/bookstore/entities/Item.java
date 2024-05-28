package com.bookstore.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.DBRef;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class Item {

    @DBRef()
    private Product product;
    private Integer quantity;
    private Double unitValue;
    private Double totalValue;

}