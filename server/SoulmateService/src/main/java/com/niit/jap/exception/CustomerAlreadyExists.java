package com.niit.jap.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code= HttpStatus.EXPECTATION_FAILED,reason = "User already exist")
public class CustomerAlreadyExists extends Exception{

}
