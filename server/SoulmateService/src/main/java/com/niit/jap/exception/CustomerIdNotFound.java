package com.niit.jap.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code= HttpStatus.NOT_FOUND,reason = "Invalid user")
public class CustomerIdNotFound extends Exception{
}
