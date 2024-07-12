package com.travsh.fluid.service;

import com.travsh.fluid.dto.response.GameResponse;
import com.travsh.fluid.entity.Game;
import com.travsh.fluid.entity.User;
import com.travsh.fluid.repository.GameRepository;
import com.travsh.fluid.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class GameService {

    @Autowired
    private GameRepository gameRepository;

    @Autowired
    private UserRepository userRepository;

    public Game saveGame(Game game) {
        return gameRepository.save(game);
    }

    public List<Game> saveAllGames(List<Game> games) {
        return gameRepository.saveAll(games);
    }

    public List<GameResponse> getAllGames(String userId) {
        // If userId is null or empty, treat it as a request for all games without ownership info
        if (userId == null || userId.isEmpty()) {
            return gameRepository.findAll().stream()
                    .map(GameResponse::new) // Create GameResponses without the owned flag
                    .collect(Collectors.toList());
        } else {

            Optional<User> optionalUser = userRepository.findById(userId);
            List<String> ownedGames = optionalUser.map(User::getOwnedGames).orElse(List.of());

            return gameRepository.findAll().stream()
                    .map(game -> new GameResponse(game, ownedGames.contains(game.getId())))
                    .collect(Collectors.toList());
        }
    }

    public GameResponse getGameById(String id, String userId) {
        Optional<Game> optionalGame = gameRepository.findById(id);
        Optional<User> optionalUser = userRepository.findById(userId);
        List<String> ownedGames = optionalUser.map(User::getOwnedGames).orElse(List.of());

        if (optionalGame.isPresent()) {
            Game game = optionalGame.get();
            return new GameResponse(game, ownedGames.contains(game.getId()));
        }
        return null;
    }

    public void deleteGame(String id) {
        gameRepository.deleteById(id);
    }

    public List<GameResponse> getGamesByIds(List<String> ids, String userId) {
        Optional<User> optionalUser = userRepository.findById(userId);
        List<String> ownedGames = optionalUser.map(User::getOwnedGames).orElse(List.of());

        return gameRepository.findAllById(ids).stream()
                .map(game -> new GameResponse(game, ownedGames.contains(game.getId())))
                .collect(Collectors.toList());
    }
}