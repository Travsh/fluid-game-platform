package com.travsh.fluid.entity;

import com.travsh.fluid.enums.Role;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Document(collection = "users")
public class User {
    @Id
    private String id;
    private String username;
    private String password;
    private Role role;
    private List<String> ownedGames = new ArrayList<>(); // List of game IDs owned by the user
    private List<String> cart = new ArrayList<>(); // Initialize cart
}
