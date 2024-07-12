package com.travsh.fluid.controller;

import com.travsh.fluid.entity.Game;
import com.travsh.fluid.service.GameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/v1/admin")
public class AdminController {

    @Autowired
    private GameService gameService;

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/games")
    public List<Game> addGames(@RequestBody List<Game> games) {
        return gameService.saveAllGames(games);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/games")
    public List<Game> updateGames(@RequestBody List<Game> games) {
        return gameService.saveAllGames(games);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/games/{id}")
    public void deleteGame(@PathVariable String id) {
        gameService.deleteGame(id);
    }
}
