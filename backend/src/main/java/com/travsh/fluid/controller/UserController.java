package com.travsh.fluid.controller;

import com.travsh.fluid.dto.request.AuthenticationRequest;
import com.travsh.fluid.dto.response.AuthenticationResponse;
import com.travsh.fluid.dto.response.UserInfoResponse;
import com.travsh.fluid.entity.User;
import com.travsh.fluid.enums.Role;
import com.travsh.fluid.repository.UserRepository;
import com.travsh.fluid.util.JwtUtil;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Optional;

@RestController
@RequestMapping("/v1/user")
@Tag(name = "User Management System", description = "Operations pertaining to user in User Management System")
public class UserController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Operation(summary = "Authenticate user and return JWT token")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully authenticated user"),
            @ApiResponse(responseCode = "401", description = "Unauthorized")
    })
    @PostMapping("/authenticate")
    public ResponseEntity<?> createAuthenticationToken(@RequestBody AuthenticationRequest authenticationRequest) throws Exception {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(authenticationRequest.getUsername(), authenticationRequest.getPassword())
        );
        final UserDetails userDetails = userDetailsService.loadUserByUsername(authenticationRequest.getUsername());
        final User user = userRepository.findByUsername(authenticationRequest.getUsername()).orElse(null);
        final String jwt = jwtUtil.generateToken(userDetails.getUsername(), user.getRole().name(), user.getId());
        return ResponseEntity.ok(new AuthenticationResponse(jwt));
    }

    @Operation(summary = "Register a new user")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "User registered successfully"),
            @ApiResponse(responseCode = "400", description = "Invalid input")
    })
    @PostMapping("/register")
    public ResponseEntity<?> saveUser(@RequestBody AuthenticationRequest authenticationRequest) {
        User user = new User();
        user.setUsername(authenticationRequest.getUsername());
        user.setPassword(passwordEncoder.encode(authenticationRequest.getPassword()));
        user.setRole(Role.MEMBER);
        user.setOwnedGames(new ArrayList<>());
        return ResponseEntity.ok(userRepository.save(user));
    }

    @Operation(summary = "Retrieve user information")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully retrieved user information",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = UserInfoResponse.class))),
            @ApiResponse(responseCode = "404", description = "User not found")
    })
    @GetMapping("")
    public ResponseEntity<?> getUserInfo() {
        String userId = getUserIdFromToken();
        Optional<User> optionalUser = userRepository.findById(userId);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            UserInfoResponse response = UserInfoResponse.builder()
                    .username(user.getUsername())
                    .ownedGames(user.getOwnedGames())
                    .role(user.getRole())
                    .build();
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    private String getUserIdFromToken() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String jwt = (String) authentication.getDetails();
        return jwtUtil.getUserIdFromToken(jwt);
    }
}