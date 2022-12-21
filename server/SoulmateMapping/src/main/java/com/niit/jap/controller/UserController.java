package com.niit.jap.controller;

import com.niit.jap.domain.User;
import com.niit.jap.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin
@RestController
@RequestMapping("/api/v3")
public class UserController {
    private final UserService service;

    @Autowired
    public UserController(UserService service) {
        this.service = service;
    }

    @PostMapping("/post")
    public ResponseEntity<?> save(@RequestBody User user) {
        return new ResponseEntity<>(service.saveUser(user), HttpStatus.CREATED);
    }

    @GetMapping("/find")
    public ResponseEntity<?> get() {
        return new ResponseEntity<>(service.getUser(), HttpStatus.OK);
    }

    @GetMapping("/interested/{id}")
    public ResponseEntity<?> getLiked(@PathVariable int id) {
        return new ResponseEntity<>(service.getInterested(id), HttpStatus.OK);
    }

    @PostMapping("/like")
    public ResponseEntity<?> like(@RequestBody List<Integer> values) {
        return new ResponseEntity<>(service.liked(values.get(0), values.get(1)), HttpStatus.OK);
    }
}
