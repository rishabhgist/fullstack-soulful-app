package com.niit.jap.service;


import com.niit.jap.domain.Interested;
import com.niit.jap.domain.User;
import com.niit.jap.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class UserService implements IUserService{
    private UserRepository repository;

    @Autowired
    public UserService(UserRepository repository) {
        this.repository = repository;
    }

    @Override
    public User saveUser(User user) {
        return repository.save(user);
    }

    @Override
    public List <User> getUser() {
        return repository.findAll();
    }

    @Override
    public List<Map<String, Interested>> getInterested(int id) {
        return repository.getLiked(id);
    }

    @Override
    public String liked(int userA, int userB) {
        repository.addInterest(userA, userB);
        return "Liked";
    }
}
