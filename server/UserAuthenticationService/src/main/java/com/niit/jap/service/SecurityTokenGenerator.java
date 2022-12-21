package com.niit.jap.service;

import com.niit.jap.domain.User;

import java.util.Map;

public interface SecurityTokenGenerator {
    Map<String, String> generateToken(User user);
}
