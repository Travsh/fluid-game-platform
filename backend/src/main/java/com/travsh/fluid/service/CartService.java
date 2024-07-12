package com.travsh.fluid.service;

import com.travsh.fluid.entity.User;
import com.travsh.fluid.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class CartService {

    @Autowired
    private UserRepository userRepository;

    public List<String> addGameToCart(String userId, String gameId) {
        Optional<User> optionalUser = userRepository.findById(userId);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            List<String> cart = user.getCart();
            if (!cart.contains(gameId)) {
                cart.add(gameId);
                user.setCart(cart);
                userRepository.save(user);
            }
            return cart;
        }
        return new ArrayList<>();
    }

    public List<String> getCartByUserId(String userId) {
        Optional<User> optionalUser = userRepository.findById(userId);
        return optionalUser.map(User::getCart).orElseGet(ArrayList::new);
    }

    public void clearCart(String userId) {
        Optional<User> optionalUser = userRepository.findById(userId);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            user.setCart(new ArrayList<>());
            userRepository.save(user);
        }
    }

    public void checkoutCart(String userId) {
        Optional<User> optionalUser = userRepository.findById(userId);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            List<String> ownedGames = user.getOwnedGames();
            List<String> cart = user.getCart();
            ownedGames.addAll(cart);
            user.setOwnedGames(ownedGames);
            user.setCart(new ArrayList<>());
            userRepository.save(user);
        }
    }

    public List<String> deleteCartItemById(String userId, String gameId) {
        Optional<User> optionalUser = userRepository.findById(userId);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            List<String> cart = user.getCart();
            cart.remove(gameId);
            user.setCart(cart);
            userRepository.save(user);
            return cart;
        }
        return new ArrayList<>();
    }
}