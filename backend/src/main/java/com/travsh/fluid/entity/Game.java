package com.travsh.fluid.entity;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@Document(collection = "games")
public class Game {
    @Id
    private String id;
    private String name;
    private String description;
    private String developer;
    private String category;
    private String currency;
    private double price;
    private List<String> resources; // URLs of images/videos
    // getters and setters
}
