package com.niit.jap.service;

import com.niit.jap.domain.Customer;
import com.niit.jap.exception.CustomerAlreadyExists;
import com.niit.jap.exception.CustomerIdNotFound;
import com.niit.jap.exception.ProductNotFound;

import java.util.List;

public interface CustomerService {
    Customer saveCustomer(Customer customer) throws CustomerAlreadyExists;
    Customer findById(String id) throws CustomerIdNotFound;
    List<Customer> getAllCustomers();
}
