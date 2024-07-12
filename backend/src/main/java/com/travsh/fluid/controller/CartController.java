package com.travsh.fluid.controller;

import com.travsh.fluid.service.CartService;
import com.travsh.fluid.util.JwtUtil;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.List;

@RestController
@RequestMapping("/v1/cart")
@Tag(name = "Cart Management", description = "Operations related to shopping cart")
public class CartController {

    @Autowired
    private CartService cartService;

    @Autowired
    private JwtUtil jwtUtil;

    @Operation(summary = "Add a game to the user's cart")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Game added to cart successfully",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = String.class))),
            @ApiResponse(responseCode = "400", description = "Invalid input")
    })
    @PostMapping("/add")
    public List<String> addGameToCart(@RequestParam String gameId) {
        String userId = getUserIdFromToken();
        return cartService.addGameToCart(userId, gameId);
    }

    @Operation(summary = "Get the user's cart")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully retrieved cart",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = String.class))),
            @ApiResponse(responseCode = "404", description = "Cart not found")
    })
    @GetMapping
    public List<String> getCartByUserId() {
        String userId = getUserIdFromToken();
        return cartService.getCartByUserId(userId);
    }

    @Operation(summary = "Clear the user's cart")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Cart cleared successfully")
    })
    @DeleteMapping("/clear")
    public void clearCart() {
        String userId = getUserIdFromToken();
        cartService.clearCart(userId);
    }

    @Operation(summary = "Checkout the user's cart")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Checkout successful"),
            @ApiResponse(responseCode = "400", description = "Invalid input")
    })
    @PostMapping("/checkout")
    public void checkoutCart() {
        String userId = getUserIdFromToken();
        cartService.checkoutCart(userId);
    }

    @Operation(summary = "Delete a cart item by ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Cart item deleted successfully",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = String.class))),
            @ApiResponse(responseCode = "404", description = "Cart item not found")
    })
    @DeleteMapping("/delete/{gameId}")
    public List<String> deleteCartItemById(@PathVariable String gameId) {
        String userId = getUserIdFromToken();
        return cartService.deleteCartItemById(userId, gameId);
    }

    private String getUserIdFromToken() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String jwt = (String) authentication.getDetails();
        return jwtUtil.getUserIdFromToken(jwt);
    }
}