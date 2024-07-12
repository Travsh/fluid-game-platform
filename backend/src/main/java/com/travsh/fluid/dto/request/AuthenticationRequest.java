package com.travsh.fluid.dto.request;

import lombok.Data;

@Data
public class AuthenticationRequest {
    private String username;
    private String password;
    // getters and setters
}