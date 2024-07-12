package com.travsh.fluid.dto.response;

import com.travsh.fluid.enums.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class UserInfoResponse {
    private String username;
    private Role role;
    private List<String> ownedGames;
}