package com.niit.jap.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.Node;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Interested {
    private int identity;
    private String name;
    private int age;
    private String gender;
    private String city;
    private String email;
}
