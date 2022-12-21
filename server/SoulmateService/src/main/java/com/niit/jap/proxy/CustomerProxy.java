package com.niit.jap.proxy;

import com.niit.jap.domain.Customer;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name="authentication-service", url = "authentication-service:8085")
public interface CustomerProxy {
    @PostMapping("/register")
    public ResponseEntity<?> saveUser(@RequestBody Customer user);

}
