package com.niit.jap.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.OK, reason = "Invalid login! Incorrect email or password")
public class UserNotFoundException extends Exception {
}
