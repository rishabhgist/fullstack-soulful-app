package com.niit.jap.service;


import com.niit.jap.domain.Interested;
import com.niit.jap.domain.User;

import java.util.List;
import java.util.Map;
import java.util.UUID;

public interface IUserService {
    User saveUser(User user);

    List <User> getUser();

    List<Map<String, Interested>> getInterested(int id);

    String liked(int userA, int userB);
}
