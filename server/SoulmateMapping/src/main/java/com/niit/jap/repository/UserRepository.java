package com.niit.jap.repository;

import com.niit.jap.domain.Interested;
import com.niit.jap.domain.User;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.data.neo4j.repository.query.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public interface UserRepository extends Neo4jRepository<User, Long> {
    @Query("MATCH (user:USER) - [:INTERESTED] -> (userB:USER) WHERE ID(user) = $id RETURN userB")
    List<Map<String, Interested>>getLiked(int id);

    @Query("MATCH (userA:USER), (userB:USER) WHERE ID(userA) = $userA AND ID(userB) = $userB CREATE (userA) - [:INTERESTED] -> (userB)")
    void addInterest(int userA, int userB);

}
