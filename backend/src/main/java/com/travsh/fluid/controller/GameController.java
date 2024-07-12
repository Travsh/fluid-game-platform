package com.travsh.fluid.controller;

import com.travsh.fluid.dto.response.GameResponse;
import com.travsh.fluid.entity.Game;
import com.travsh.fluid.service.GameService;
import com.travsh.fluid.util.JwtUtil;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/v1/games")
@Tag(name = "Game Management", description = "Operations related to game management")
public class GameController {

    @Autowired
    private GameService gameService;

    @Autowired
    private JwtUtil jwtUtil;

    @Operation(summary = "Add a new game")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Game added successfully",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = Game.class))),
            @ApiResponse(responseCode = "400", description = "Invalid input")
    })
    @PostMapping
    public Game addGame(@RequestBody Game game) {
        return gameService.saveGame(game);
    }

    @Operation(summary = "Get all games")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully retrieved all games",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = GameResponse.class))),
            @ApiResponse(responseCode = "404", description = "Games not found")
    })
    @GetMapping
    public List<GameResponse> getAllGames(@RequestHeader(value = "Authorization", required = false) String token) {
        if (token == null || token.isEmpty()) {
            return gameService.getAllGames(""); // Pass an empty string as userId if no token
        } else {
            String userId = jwtUtil.getUserIdFromToken(token.substring(7));
            return gameService.getAllGames(userId);
        }
    }

    @Operation(summary = "Get a game by ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully retrieved game by ID",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = GameResponse.class))),
            @ApiResponse(responseCode = "404", description = "Game not found")
    })
    @GetMapping("/{id}")
    public GameResponse getGameById(@PathVariable String id, @RequestHeader("Authorization") String token) {
        String userId = jwtUtil.getUserIdFromToken(token.substring(7));
        return gameService.getGameById(id, userId);
    }

    @Operation(summary = "Update a game")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Game updated successfully",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = Game.class))),
            @ApiResponse(responseCode = "400", description = "Invalid input")
    })
    @PutMapping("/{id}")
    public Game updateGame(@PathVariable String id, @RequestBody Game game) {
        game.setId(id);
        return gameService.saveGame(game);
    }

    @Operation(summary = "Delete a game")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Game deleted successfully"),
            @ApiResponse(responseCode = "404", description = "Game not found")
    })
    @DeleteMapping("/{id}")
    public void deleteGame(@PathVariable String id) {
        gameService.deleteGame(id);
    }

    @Operation(summary = "Get games by IDs")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully retrieved games by IDs",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = GameResponse.class))),
            @ApiResponse(responseCode = "404", description = "Games not found")
    })
    @GetMapping(params = "ids")
    public List<GameResponse> getGamesByIds(@RequestParam List<String> ids, @RequestHeader("Authorization") String token) {
        String userId = jwtUtil.getUserIdFromToken(token.substring(7));
        return gameService.getGamesByIds(ids, userId);
    }
}