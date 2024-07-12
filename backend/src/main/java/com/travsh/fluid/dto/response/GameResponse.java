package com.travsh.fluid.dto.response;

import com.travsh.fluid.entity.Game;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GameResponse {
    private String id;
    private String name;
    private String description;
    private String developer;
    private String category;
    private String currency;
    private double price;
    private List<String> resources;
    private boolean owned;

    public GameResponse(Game game, boolean owned) {
        this.id = game.getId();
        this.name = game.getName();
        this.description = game.getDescription();
        this.developer = game.getDeveloper();
        this.category = game.getCategory();
        this.currency = game.getCurrency();
        this.price = game.getPrice();
        this.resources = game.getResources();
        this.owned = owned;
    }

    public GameResponse(Game game) {
        this.id = game.getId();
        this.name = game.getName();
        this.description = game.getDescription();
        this.developer = game.getDeveloper();
        this.category = game.getCategory();
        this.currency = game.getCurrency();
        this.price = game.getPrice();
        this.resources = game.getResources();
        this.owned = false;
    }
}
