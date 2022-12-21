package com.niit.jap.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.neo4j.core.schema.*;

import java.util.List;


@Node("USER")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id @GeneratedValue private Long id;
    private String email;
    private String name;
    private long age;
    private String gender;
    private String city;

    @Relationship(type = "INTERESTED", direction = Relationship.Direction.OUTGOING)
    private List<Interested> interested;

    @Relationship(type = "NOT_INTERESTED", direction = Relationship.Direction.OUTGOING)
    private List<NotInterested> notInterested;

}
