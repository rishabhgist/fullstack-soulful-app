package com.niit.jap.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Generated;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
@Data
@AllArgsConstructor
public class Customer {
    @Id
    private String id;
    private String name;
    private int age;
    private String gender;
    private String city;
    private String email;
    private String password;

    public Customer() {
    }
}