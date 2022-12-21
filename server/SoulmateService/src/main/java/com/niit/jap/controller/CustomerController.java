package com.niit.jap.controller;

import com.niit.jap.configuration.CustomerDTO;
import com.niit.jap.configuration.Producer;
import com.niit.jap.configuration.ProducerMapping;
import com.niit.jap.domain.Customer;
import com.niit.jap.exception.CustomerAlreadyExists;
import com.niit.jap.exception.CustomerIdNotFound;
import com.niit.jap.exception.ProductNotFound;
import com.niit.jap.proxy.CustomerProxy;
import com.niit.jap.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
@CrossOrigin
@RestController
@RequestMapping("/api/v2")
public class CustomerController {
    private CustomerService service;
//    private CustomerProxy proxy;
    private Producer producer;

    private ProducerMapping producerMapping;

    @Autowired
    public CustomerController(CustomerService service,Producer producer, ProducerMapping
                               producerMapping) {
        this.service = service;
        this.producer = producer;
        this.producerMapping = producerMapping;
    }

    @PostMapping("/post")
    public ResponseEntity<?> saveCustomer(@RequestBody Customer customer) throws CustomerAlreadyExists {
        if(service.saveCustomer(customer).getEmail().isEmpty()){
            throw new CustomerAlreadyExists();
        }
        CustomerDTO customerDTO = new CustomerDTO(customer.getName(), customer.getAge(), customer.getCity(), customer.getGender(), customer.getEmail(), customer.getPassword());
        producer.sendMsg(customerDTO);
        producerMapping.sendMsg(customerDTO);
        return new ResponseEntity<>(service.saveCustomer(customer), HttpStatus.CREATED);
    }
    @GetMapping("/user")
    public ResponseEntity<?> getUser(){
        return new ResponseEntity<>(service.getAllCustomers(),HttpStatus.OK);
    }
    @GetMapping("/user/{id}")
    public ResponseEntity<?> findCustomerById(@PathVariable String id) throws CustomerIdNotFound {
        if(service.findById(id).getName().isEmpty()){
            throw new CustomerIdNotFound();
        }
        return new ResponseEntity<>(service.findById(id),HttpStatus.OK);
    }
}
