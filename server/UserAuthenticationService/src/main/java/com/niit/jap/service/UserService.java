package com.niit.jap.service;

import com.niit.jap.domain.User;
import com.niit.jap.exception.UserNotFoundException;

import java.util.List;
import java.util.Optional;

public interface UserService {
    User saveUser(User user);

    List<User> getAll();

    Optional<User> getById(int id);

    User getByEmailAndPassword(String email, String password) throws UserNotFoundException;
}
