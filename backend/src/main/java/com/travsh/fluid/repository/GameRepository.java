package com.travsh.fluid.repository;

import com.travsh.fluid.entity.Game;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface GameRepository extends MongoRepository<Game, String> {
}
