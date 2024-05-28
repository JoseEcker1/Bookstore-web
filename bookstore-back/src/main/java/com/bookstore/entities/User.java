package com.bookstore.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Document(collection = "users")
public class User {

    @Id
    private String id;
    @NotBlank(message = "Todos os campos devem ser preenchidos.")
    @Pattern(regexp = "^[A-Za-z0-9]*$", message = "São permitidos apenas letras e números no nome de usuário.")
    @Size(max = 10, message = "Nome de usuário não pode ter mais de 10 caracteres.")
    @Indexed(unique = true)
    private String username;
    @NotEmpty(message = "Todos os campos devem ser preenchidos.")
    @Size(max = 20, message = "A senha não pode ter mais de 20 caracteres.")
    private String password;

    @DBRef()
    @JsonIgnore
    private List<Order> orders = new ArrayList<>();

    public Void addOrder(Order o){
        this.orders.add(o);
        return null;
    }

}